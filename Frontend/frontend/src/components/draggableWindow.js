import {useState} from "react";

export default function DraggableWindow({children, initialPosition = {x: 100, y: 100}, handleSelector}) {
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({x: 0, y: 0});

    const handleMouseDown = (e) => {
        if (handleSelector && !e.target.closest(handleSelector)) return;
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        });
    };

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
