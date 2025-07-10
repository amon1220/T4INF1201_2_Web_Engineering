import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import DraggableWindow from "./draggableWindow.js";
import WordleGame from "./WordleApp.js";
import WordleAppButton from "./WordleAppButton";

/**
 *  Just the basic UI Window placeholder, will maybe be filled with content later
 * @param Onclose just determines the component thats called on in Desktop.js to close the tab
 * @param onMinimize function to minimize the window
 *
 * @returns a draggable window that can be filled with content
 */

export default function GameCenter({ onMinimize, onClose }) {
    const [activeGame, setActiveGame] = useState(null); // central game manager
    const windowRef = useRef(null); // ref to access GameCenter window

    // move window to custom coordinates when a game starts
    useEffect(() => {
        if (activeGame && windowRef.current) {
            windowRef.current.style.left = "0px";    // set new X position
            windowRef.current.style.top = "0px";     // set new Y position
            windowRef.current.style.transform = "none"; // disable center translation
        }
    }, [activeGame]);

    return (
        <DraggableWindow initialPosition={{ x: 200, y: 100 }} handleSelector=".title-bar">
            <div
                ref={windowRef}
                className="window"
                style={{
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}
            >
                <div className="title-bar">
                    <div className="title-bar-text">Game Center</div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize" onClick={onMinimize}></button>
                        <button aria-label="Maximize"></button>
                        <button aria-label="Close" onClick={onClose}></button>
                    </div>
                </div>

                <div className="window-body" style={{
                    padding: 10,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px"
                }}>
                    {/* Game selection buttons */}
                    {!activeGame && (
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                            <WordleAppButton onOpen={() => setActiveGame("wordle")} />
                        </div>
                    )}

                    {/* Render selected game */}
                    {activeGame === "wordle" && (
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "10px"
                        }}>
                            <WordleGame onExit={() => setActiveGame(null)} />
                        </div>
                    )}
                </div>
            </div>
        </DraggableWindow>
    );
}