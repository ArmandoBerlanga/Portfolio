import { useRef } from "react";
import { MENUBAR_HEIGHT } from "./useWindowDrag";

export const RESIZE_EDGES = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];

const CURSORS = {
    n: "ns-resize",
    s: "ns-resize",
    e: "ew-resize",
    w: "ew-resize",
    ne: "nesw-resize",
    sw: "nesw-resize",
    nw: "nwse-resize",
    se: "nwse-resize",
};

export function edgeCursor(edge) {
    return CURSORS[edge];
}

export default function useWindowResize({
    elRef,
    bounds,
    minSize,
    onCommit,
    disabled,
}) {
    const session = useRef(null);

    function apply(next) {
        const el = elRef.current;
        if (!el) {return;}
        el.style.transform = `translate3d(${next.x}px, ${next.y}px, 0)`;
        el.style.width = `${next.w}px`;
        el.style.height = `${next.h}px`;
    }

    function compute(edge, dx, dy) {
        let { x, y, w, h } = session.current.start;
        if (edge.includes("e")) {w += dx;}
        if (edge.includes("s")) {h += dy;}
        if (edge.includes("w")) {
            w -= dx;
            x += dx;
        }
        if (edge.includes("n")) {
            h -= dy;
            y += dy;
        }
        if (w < minSize.w) {
            if (edge.includes("w")) {x -= minSize.w - w;}
            w = minSize.w;
        }
        if (h < minSize.h) {
            if (edge.includes("n")) {y -= minSize.h - h;}
            h = minSize.h;
        }
        if (y < MENUBAR_HEIGHT) {
            h -= MENUBAR_HEIGHT - y;
            y = MENUBAR_HEIGHT;
        }
        return { x, y, w, h };
    }

    function handlersFor(edge) {
        return {
            onPointerDown(e) {
                if (disabled || e.button !== 0) {return;}
                e.currentTarget.setPointerCapture(e.pointerId);
                session.current = {
                    edge,
                    startX: e.clientX,
                    startY: e.clientY,
                    start: { ...bounds },
                    last: { ...bounds },
                };
                elRef.current?.setAttribute("data-dragging", "");
            },
            onPointerMove(e) {
                const s = session.current;
                if (!s) {return;}
                const next = compute(
                    s.edge,
                    e.clientX - s.startX,
                    e.clientY - s.startY,
                );
                s.last = next;
                apply(next);
            },
            onPointerUp: end,
            onPointerCancel: end,
        };
    }

    function end() {
        const s = session.current;
        if (!s) {return;}
        session.current = null;
        elRef.current?.removeAttribute("data-dragging");
        onCommit(s.last);
    }

    return { handlersFor };
}
