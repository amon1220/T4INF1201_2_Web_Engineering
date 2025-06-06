import React from "react";
import "../App.css";

export default function Notepad({ onClose }) {
    return (
        <div className="window" style={{position: "absolute"}}>

            <div className="title-bar">
                <div className="title-bar-text">Notepad</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
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

                <textarea className="notepad-text-area"/>
                {/*<div className="field-row-stacked" style={{ width: "300px" }}>
                    <label htmlFor="text20"></label>
                    <textarea id="text20" rows="8"></textarea>
                </div>*/}
            </div>


        </div>


    );




}
