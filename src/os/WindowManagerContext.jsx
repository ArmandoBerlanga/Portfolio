import {
    createContext,
    useContext,
    useMemo,
    useReducer,
} from "react";
import PropTypes from "prop-types";
import { APP_BY_ID } from "./apps";

const StateContext = createContext(null);
const ActionsContext = createContext(null);

// Consumed directly by apps (e.g. the terminal) that must tolerate running
// outside the provider on mobile, where useWindowActions would throw.
export { ActionsContext as ActionsContextForTerminal };

const BASE_Z = 10;
const MAX_Z = 500;
const CASCADE_OFFSET = 28;

function clampToViewport(bounds) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w = Math.min(bounds.w, vw - 24);
    const h = Math.min(bounds.h, vh - 120);
    return {
        w,
        h,
        x: Math.max(8, Math.min(bounds.x, vw - w - 8)),
        y: Math.max(36, Math.min(bounds.y, vh - 140)),
    };
}

function renormalize(windows) {
    const sorted = Object.values(windows).sort((a, b) => a.zIndex - b.zIndex);
    const next = {};
    sorted.forEach((win, i) => {
        next[win.appId] = { ...win, zIndex: BASE_Z + i };
    });
    return { windows: next, nextZ: BASE_Z + sorted.length };
}

export function reducer(state, action) {
    switch (action.type) {
        case "OPEN_APP": {
            const { appId } = action;
            const existing = state.windows[appId];
            if (existing) {
                return reducer(
                    {
                        ...state,
                        windows: {
                            ...state.windows,
                            [appId]: { ...existing, minimized: false },
                        },
                    },
                    { type: "FOCUS", appId },
                );
            }
            const app = APP_BY_ID[appId];
            if (!app) {return state;}
            const openCount = Object.keys(state.windows).length;
            const bounds = clampToViewport({
                ...app.defaultBounds,
                x: app.defaultBounds.x + openCount * CASCADE_OFFSET,
                y: app.defaultBounds.y + openCount * CASCADE_OFFSET,
            });
            return {
                ...state,
                windows: {
                    ...state.windows,
                    [appId]: {
                        appId,
                        minimized: false,
                        maximized: false,
                        bounds,
                        zIndex: state.nextZ,
                        openedAt: state.openSeq,
                    },
                },
                focusedId: appId,
                nextZ: state.nextZ + 1,
                openSeq: state.openSeq + 1,
            };
        }
        case "CLOSE_APP": {
            const { [action.appId]: removed, ...rest } = state.windows;
            if (!removed) {return state;}
            const remaining = Object.values(rest).filter((w) => !w.minimized);
            const top = remaining.sort((a, b) => b.zIndex - a.zIndex)[0];
            return {
                ...state,
                windows: rest,
                focusedId:
                    state.focusedId === action.appId
                        ? (top?.appId ?? null)
                        : state.focusedId,
            };
        }
        case "MINIMIZE": {
            const win = state.windows[action.appId];
            if (!win) {return state;}
            const others = Object.values(state.windows).filter(
                (w) => w.appId !== action.appId && !w.minimized,
            );
            const top = others.sort((a, b) => b.zIndex - a.zIndex)[0];
            return {
                ...state,
                windows: {
                    ...state.windows,
                    [action.appId]: { ...win, minimized: true },
                },
                focusedId:
                    state.focusedId === action.appId
                        ? (top?.appId ?? null)
                        : state.focusedId,
            };
        }
        case "TOGGLE_MAXIMIZE": {
            const win = state.windows[action.appId];
            if (!win) {return state;}
            return reducer(
                {
                    ...state,
                    windows: {
                        ...state.windows,
                        [action.appId]: { ...win, maximized: !win.maximized },
                    },
                },
                { type: "FOCUS", appId: action.appId },
            );
        }
        case "FOCUS": {
            const win = state.windows[action.appId];
            if (!win) {return state;}
            if (state.focusedId === action.appId && win.zIndex === state.nextZ - 1) {
                return state;
            }
            let next = {
                ...state,
                windows: {
                    ...state.windows,
                    [action.appId]: { ...win, zIndex: state.nextZ },
                },
                focusedId: action.appId,
                nextZ: state.nextZ + 1,
            };
            if (next.nextZ > MAX_Z) {
                next = { ...next, ...renormalize(next.windows) };
            }
            return next;
        }
        case "SET_BOUNDS": {
            const win = state.windows[action.appId];
            if (!win) {return state;}
            return {
                ...state,
                windows: {
                    ...state.windows,
                    [action.appId]: { ...win, bounds: action.bounds },
                },
            };
        }
        case "CYCLE_FOCUS": {
            const open = Object.values(state.windows)
                .filter((w) => !w.minimized)
                .sort((a, b) => a.openedAt - b.openedAt);
            if (open.length < 2) {return state;}
            const idx = open.findIndex((w) => w.appId === state.focusedId);
            const next = open[(idx + 1) % open.length];
            return reducer(state, { type: "FOCUS", appId: next.appId });
        }
        default:
            return state;
    }
}

const initialState = {
    windows: {},
    focusedId: null,
    nextZ: BASE_Z,
    openSeq: 0,
};

export function WindowManagerProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = useMemo(
        () => ({
            openApp: (appId) => dispatch({ type: "OPEN_APP", appId }),
            closeApp: (appId) => dispatch({ type: "CLOSE_APP", appId }),
            minimize: (appId) => dispatch({ type: "MINIMIZE", appId }),
            toggleMaximize: (appId) =>
                dispatch({ type: "TOGGLE_MAXIMIZE", appId }),
            focus: (appId) => dispatch({ type: "FOCUS", appId }),
            setBounds: (appId, bounds) =>
                dispatch({ type: "SET_BOUNDS", appId, bounds }),
            cycleFocus: () => dispatch({ type: "CYCLE_FOCUS" }),
        }),
        [],
    );

    return (
        <ActionsContext.Provider value={actions}>
            <StateContext.Provider value={state}>
                {children}
            </StateContext.Provider>
        </ActionsContext.Provider>
    );
}

WindowManagerProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useWindowManager() {
    const ctx = useContext(StateContext);
    if (!ctx) {
        throw new Error(
            "useWindowManager must be used within WindowManagerProvider",
        );
    }
    return ctx;
}

export function useWindowActions() {
    const ctx = useContext(ActionsContext);
    if (!ctx) {
        throw new Error(
            "useWindowActions must be used within WindowManagerProvider",
        );
    }
    return ctx;
}
