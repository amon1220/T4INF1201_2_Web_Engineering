import React from "react";
import "../App.css";
import DraggableWindow from "./draggableWindow.js";
export default function Notepad({ onClose }) {
    return (
        <DraggableWindow initialPosition={{ x: 200, y: 100 }} handleSelector=".title-bar">
        <div className="window" style={{position: "absolute"}}>

            <div className="title-bar">
                <div className="title-bar-text">Notepad</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize"></button>
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
                    <button className="notepad-file-help-button">File</button>
                    <button className="notepad-file-help-button">Help</button>
                </div>

                <textarea className="notepad-text-area"  style={{ width: "300px", height : "300px" }}/>
                {/*<div className="field-row-stacked" style={{ width: "300px" }}>
                    <label htmlFor="text20"></label>
                    <textarea id="text20" rows="8"></textarea>
                </div>*/}
            </div>


        </div>

    </DraggableWindow>
    );




}
