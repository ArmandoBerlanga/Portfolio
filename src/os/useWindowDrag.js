import { useRef } from "react";

export const MENUBAR_HEIGHT = 28;
const EDGE_MARGIN = 80; // px of titlebar that must stay reachable

/*
 * Dragging writes transforms straight to the DOM node and only commits the
 * final bounds to the reducer on pointerup — dispatching at pointer-move
 * frequency would re-render the whole desktop at 60-120Hz.
 */
export default function useWindowDrag({ elRef, bounds, onCommit, disabled }) {
    const session = useRef(null);

    function clamp(x, y) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        return {
            x: Math.max(EDGE_MARGIN - bounds.w, Math.min(x, vw - EDGE_MARGIN)),
            y: Math.max(MENUBAR_HEIGHT, Math.min(y, vh - 60)),
        };
    }

    function onPointerDown(e) {
        if (disabled || e.button !== 0) {return;}
        if (e.target.closest("button")) {return;}
        e.currentTarget.setPointerCapture(e.pointerId);
        session.current = {
            startX: e.clientX,
            startY: e.clientY,
            x: bounds.x,
            y: bounds.y,
            lastX: bounds.x,
            lastY: bounds.y,
        };
        elRef.current?.setAttribute("data-dragging", "");
    }

    function onPointerMove(e) {
        const s = session.current;
        if (!s || !elRef.current) {return;}
        const { x, y } = clamp(
            s.x + e.clientX - s.startX,
            s.y + e.clientY - s.startY,
        );
        s.lastX = x;
        s.lastY = y;
        elRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    function onPointerEnd() {
        const s = session.current;
        if (!s) {return;}
        session.current = null;
        elRef.current?.removeAttribute("data-dragging");
        if (s.lastX !== s.x || s.lastY !== s.y) {
            onCommit({ ...bounds, x: s.lastX, y: s.lastY });
        }
    }

    return {
        onPointerDown,
        onPointerMove,
        onPointerUp: onPointerEnd,
        onPointerCancel: onPointerEnd,
    };
}
