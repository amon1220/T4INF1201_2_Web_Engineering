import {useState, useCallback} from "react";

/**
 * Draggablewindow is used to drag components on the main screen
 * @param {React.ReactNode} children - the component
 * @param {{x: number, y: number}} [initialPosition={x: 100, y: 100}] - the starting position of the component (optional)
 * @param {string} [handleSelector] - css selector that determines where the window is actually draggable, for us its the titlebar.
 *
 * @returns element at changed position
 */
export default function DraggableWindow({ children, initialPosition = { x: 100, y: 100 }, handleSelector }) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

    // Capture the Mouse pointer, record click offset, and start dragging
    const onPointerDown = useCallback((e) => {
        if ((handleSelector && !e.target.closest(handleSelector)) || e.target.closest('button, input, a, [role="button"]')) return;
        const el = e.currentTarget;
        el.setPointerCapture(e.pointerId);
        setOffset({x: e.clientX - position.x, y: e.clientY - position.y});
        setIsDragging(true);
    }, [handleSelector, position]);

    // Calc new position based on mouse movement
    const onPointerMove = useCallback((e) => {
        if (!isDragging) return;
        setPosition({x: e.clientX - offset.x, y: e.clientY - offset.y});
    }, [isDragging, offset]);

    // Stop dragging and release the pointer capture
    const onPointerUp = useCallback((e) => {
        const el = e.currentTarget;
        el.releasePointerCapture(e.pointerId);
        setIsDragging(false);
    }, []);

    return (<div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{
            position: "absolute", left: position.x, top: position.y, zIndex: 10, userSelect: "none",
        }}
    >
        {children}
    </div>);
}
