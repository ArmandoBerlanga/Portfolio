import { Suspense, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../../components/ErrorBoundary';
import Spinner from './Spinner';
import { useWindowActions } from '../WindowManagerContext';
import useWindowDrag, { MENUBAR_HEIGHT } from '../useWindowDrag';
import useWindowResize, { RESIZE_EDGES, edgeCursor } from '../useWindowResize';

const KEYBOARD_STEP = 20;

const EDGE_CLASSES = {
    n: 'top-0 left-3 right-3 h-1.5',
    s: 'bottom-0 left-3 right-3 h-1.5',
    e: 'right-0 top-3 bottom-3 w-1.5',
    w: 'left-0 top-3 bottom-3 w-1.5',
    ne: 'top-0 right-0 size-3',
    nw: 'top-0 left-0 size-3',
    se: 'bottom-0 right-0 size-3',
    sw: 'bottom-0 left-0 size-3'
};

function TrafficLight({ color, label, glyph, onClick, focused }) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className={`group/light relative size-[13px] rounded-full transition-colors duration-200 before:absolute before:-inset-1.5 active:brightness-85 ${
                focused ? color : 'bg-[#c8c8cc] dark:bg-[#4a4a52]'
            }`}
        >
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[9px] font-bold leading-none text-black/55 opacity-0 transition-opacity duration-100 group-hover/lights:opacity-100">
                {glyph}
            </span>
        </button>
    );
}

TrafficLight.propTypes = {
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    glyph: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    focused: PropTypes.bool.isRequired
};

export default function Window({ app, win, focused }) {
    const { closeApp, minimize, toggleMaximize, focus, setBounds } = useWindowActions();
    const elRef = useRef(null);
    const animRef = useRef(null);
    const [anim, setAnim] = useState('opening');
    const { bounds, minimized, maximized, zIndex } = win;
    const interactive = !maximized && anim === null;

    const drag = useWindowDrag({
        elRef,
        bounds,
        onCommit: b => setBounds(app.id, b),
        disabled: !interactive
    });
    const { handlersFor } = useWindowResize({
        elRef,
        bounds,
        minSize: app.minSize,
        onCommit: b => setBounds(app.id, b),
        disabled: !interactive
    });

    useEffect(() => {
        if (!minimized && anim === null) {
            elRef.current?.focus({ preventScroll: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minimized]);

    // Aim the minimize/close animations at this app's dock icon. Opening
    // stays centered — origin travel reads as jumpy at window scale.
    function aimAtDock() {
        const el = animRef.current;
        const icon = document.getElementById(`dock-${app.id}`);
        if (!el || !icon) {
            return;
        }
        const rect = icon.getBoundingClientRect();
        el.style.transformOrigin = `${rect.left + rect.width / 2 - bounds.x}px ${rect.top - bounds.y}px`;
    }

    useEffect(() => {
        elRef.current?.focus({ preventScroll: true });
    }, []);

    function onAnimationEnd(e) {
        if (e.target !== animRef.current) {
            return;
        }
        if (anim === 'closing') {
            document.getElementById(`dock-${app.id}`)?.focus();
            closeApp(app.id);
            return;
        }
        if (anim === 'minimizing') {
            minimize(app.id);
        }
        if (animRef.current) {
            animRef.current.style.transformOrigin = '';
        }
        setAnim(null);
    }

    function requestClose() {
        aimAtDock();
        setAnim('closing');
    }

    function requestMinimize() {
        aimAtDock();
        setAnim('minimizing');
    }

    function onTitlebarKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            toggleMaximize(app.id);
            return;
        }
        if (maximized) {
            return;
        }
        const deltas = {
            ArrowUp: [0, -KEYBOARD_STEP],
            ArrowDown: [0, KEYBOARD_STEP],
            ArrowLeft: [-KEYBOARD_STEP, 0],
            ArrowRight: [KEYBOARD_STEP, 0]
        };
        const delta = deltas[e.key];
        if (!delta) {
            return;
        }
        e.preventDefault();
        const [dx, dy] = delta;
        if (e.shiftKey) {
            setBounds(app.id, {
                ...bounds,
                w: Math.max(app.minSize.w, bounds.w + dx),
                h: Math.max(app.minSize.h, bounds.h + dy)
            });
        } else {
            setBounds(app.id, {
                ...bounds,
                x: bounds.x + dx,
                y: Math.max(MENUBAR_HEIGHT, bounds.y + dy)
            });
        }
    }

    const animClass = {
        opening: 'animate-[win-open_420ms_var(--ease-mac-spring)]',
        closing: 'animate-[win-close_180ms_var(--ease-mac-exit)_forwards]',
        minimizing: 'animate-[win-minimize_300ms_var(--ease-mac-exit)_forwards]'
    }[anim];

    const frameStyle = maximized
        ? { zIndex, top: MENUBAR_HEIGHT, left: 0, right: 0, bottom: 0 }
        : {
              zIndex,
              top: 0,
              left: 0,
              width: bounds.w,
              height: bounds.h,
              transform: `translate3d(${bounds.x}px, ${bounds.y}px, 0)`
          };

    return (
        <section
            ref={elRef}
            role="dialog"
            aria-label={app.title}
            tabIndex={-1}
            data-window={app.id}
            onPointerDownCapture={() => {
                if (!focused) {
                    focus(app.id);
                }
            }}
            style={frameStyle}
            className={`absolute outline-none [contain:layout] ${minimized ? 'invisible' : ''}`}
        >
            {/*
             * Positioning lives on the outer element (translate3d / drag);
             * open/close/minimize animations run here so their transform
             * keyframes never override the window's x/y.
             */}
            <div
                ref={animRef}
                onAnimationEnd={onAnimationEnd}
                className={`glass-window flex h-full flex-col overflow-hidden text-ink ${maximized ? '' : 'rounded-xl'} ${
                    focused ? 'shadow-window' : 'shadow-window-blur'
                } transition-[box-shadow] duration-200 ${animClass ?? ''}`}
            >
                {/* Titlebar */}
                <header
                    className="relative flex h-10 shrink-0 select-none items-center bg-titlebar shadow-[inset_0_-0.5px_0_var(--window-divider)]"
                    onDoubleClick={() => toggleMaximize(app.id)}
                    {...(interactive ? drag : {})}
                    style={{ touchAction: 'none' }}
                >
                    <div className="group/lights flex items-center gap-2 pl-3">
                        <TrafficLight
                            color="bg-light-red"
                            label={`Close ${app.title}`}
                            glyph="×"
                            onClick={requestClose}
                            focused={focused}
                        />
                        <TrafficLight
                            color="bg-light-yellow"
                            label={`Minimize ${app.title}`}
                            glyph="−"
                            onClick={requestMinimize}
                            focused={focused}
                        />
                        <TrafficLight
                            color="bg-light-green"
                            label={`Maximize ${app.title}`}
                            glyph="+"
                            onClick={() => toggleMaximize(app.id)}
                            focused={focused}
                        />
                    </div>
                    <span
                        role="button"
                        tabIndex={0}
                        aria-label={`${app.title} window. Use arrow keys to move, Shift plus arrows to resize, Enter to maximize.`}
                        onKeyDown={onTitlebarKeyDown}
                        className={`absolute left-1/2 -translate-x-1/2 cursor-default rounded text-[13px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                            focused ? 'text-ink-2' : 'text-ink-3'
                        }`}
                    >
                        {app.title}
                    </span>
                </header>

                {/* Content */}
                <div className="@container min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
                    <ErrorBoundary>
                        <Suspense fallback={<Spinner />}>
                            <app.Component />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>

            {/* Resize handles */}
            {interactive &&
                RESIZE_EDGES.map(edge => (
                    <div
                        key={edge}
                        aria-hidden="true"
                        className={`absolute ${EDGE_CLASSES[edge]}`}
                        style={{
                            cursor: edgeCursor(edge),
                            touchAction: 'none'
                        }}
                        {...handlersFor(edge)}
                    />
                ))}
        </section>
    );
}

Window.propTypes = {
    app: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        minSize: PropTypes.object.isRequired,
        Component: PropTypes.elementType.isRequired
    }).isRequired,
    win: PropTypes.shape({
        bounds: PropTypes.object.isRequired,
        minimized: PropTypes.bool.isRequired,
        maximized: PropTypes.bool.isRequired,
        zIndex: PropTypes.number.isRequired
    }).isRequired,
    focused: PropTypes.bool.isRequired
};
