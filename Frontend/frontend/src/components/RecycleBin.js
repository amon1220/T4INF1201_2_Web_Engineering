import React from "react";
import "../App.css";
import DraggableWindow from "./draggableWindow.js";
/**
 *  Just the basic UI Window placeholder, will maybe be filled with content later
 * @param OnClose just determines the component thats called on in Desktop.js to close the tab
 * @param onMinimize function to minimize the window
 *
 * @returns a draggable window that can be filled with content
 */
export default function RecycleBin({ onMinimize, onClose}) {
    return (
        <DraggableWindow initialPosition={{x: 200, y: 100}} handleSelector=".title-bar">
            <div className="window"
                 style={{
                     position: "absolute",
                     top: "30%",
                     left: "50%",
                     transform: "translate(-50%, -50%)"
                 }}>

                <div className="title-bar">
                    <div className="title-bar-text">Recycle Bin</div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize" onClick={onMinimize}></button>
                        <button aria-label="Maximize"></button>
                        <button aria-label="Close" onClick={onClose}></button>
                    </div>
                </div>


                <div className="window-body" style={{
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div className="status-bar">

                    </div>


                </div>


            </div>

        </DraggableWindow>
    );


}
