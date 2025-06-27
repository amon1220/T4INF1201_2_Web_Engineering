import {useState} from "react";

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

  //If mouse is clicked, set dragging true and set where your Mouse clicked the component
  const handleMouseDown = (e) => {
    if (handleSelector && !e.target.closest(handleSelector)) return;
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };
 //If dragging is stopped, set new position
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };
    //If mouse click is released, set dragging to false
  const handleMouseUp = () => setIsDragging(false);

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                zIndex: 10,
                userSelect: "none",
            }}
        >
            {children}
        </div>
    );
}
