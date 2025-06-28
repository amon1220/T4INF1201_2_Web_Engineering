import React, {useState, useEffect} from "react";
import "../App.css";
import '98.css';
import DraggableWindow from "./draggableWindow.js";


export function FileSelector({onClose}) {
    useEffect(() => {
        document.querySelectorAll('table.interactive').forEach(element => {
            element.addEventListener('click', (event) => {
                const highlightedClass = 'highlighted';
                const isRow = element => element.tagName === 'TR' && element.parentElement.tagName === 'TBODY';
                const newlySelectedRow = event.composedPath().find(isRow);
                const previouslySelectedRow = Array.from(newlySelectedRow?.parentElement?.children || [])
                    .filter(isRow)
                    .find(element => element.classList.contains(highlightedClass));

                if (previouslySelectedRow) {
                    previouslySelectedRow.classList.toggle(highlightedClass);
                }

                if (newlySelectedRow) {
                    newlySelectedRow.classList.toggle(highlightedClass);
                }
            });
        });
    }, []);

    return (
        <DraggableWindow initialPosition={{x: 250, y: 150}} handleSelector=".title-bar">
            <div className="window" style={{position: "absolute", width: "400px"}}>
                <div className="title-bar">
                    <div className="title-bar-text">Open File</div>
                    <div className="title-bar-controls">
                        <button aria-label="Close" onClick={onClose}></button>
                    </div>
                </div>
                <div className="window-body">
                    <div className="sunken-panel" style={{height: "200px", width: "100%", overflow: "hidden"}}>
                        <div style={{width: "100%", height: "100%", overflow: "auto"}}>
                            <table className="table-notepad">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Erstellungsdatum</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Array(15).fill(null).map((_, index) => (
                                    <tr key={index}>
                                        <td>Testdokument</td>
                                        <td>01.01.2025</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="field-row" style={{justifyContent: "flex-end", padding: "10px"}}>
                        <button>Open</button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </DraggableWindow>
    );
}


export default function Notepad({onClose}) {
    // Defintionen für das Filemenü
    const [fileMenuOpen, setFileMenuOpen] = useState(false);
    const [showFileSelector, setShowFileSelector] = useState(false);
    const [error, setError] = useState("");


    function startNotpadFileMenu() {
        setFileMenuOpen(!fileMenuOpen);
    }

    function handleOpenFile() {
        setShowFileSelector(true);
        setFileMenuOpen(false);
    }

    const handleClickSaveFile = async (e) => {
        e.preventDefault();
        const userString = localStorage.getItem("user");

        const user = JSON.parse(userString);
        const userId = user.user_id;
        const currentTime = new Date().toLocaleTimeString();
        const LastEdited = new Date().toLocaleTimeString();
        const notepadContend = document.getElementById("notepad-text-area").value;

        try {
            const res = await fetch("/api/notepad", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    user_id: userId,
                    saved_text: notepadContend,
                    created: currentTime,
                    last_edited: LastEdited
                })
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg.message || "Saving failed");
            }
        } catch (err) {
            setError(err.message || "An error occurred during Saving");
        }
    };

    // <statusbar style={{position: 'relative'}}> gave an error but <div className="statusbar" style={{position: 'relative'}}> seems to work the same
    return (
        <>
            <DraggableWindow initialPosition={{x: 200, y: 100}} handleSelector=".title-bar">
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
                        <div className="statusbar" style={{position: 'relative'}}>
                            <button className="notepad-file-help-button" onClick={startNotpadFileMenu}>File</button>
                            <button className="notepad-file-help-button">Help</button>
                            {fileMenuOpen && (
                                <div className="window-body" style={{
                                    padding: 0,
                                    margin: 0
                                }}>
                                    <div className="menu">
                                        <div className="menu-item" onClick={handleClickSaveFile}>Save File</div>
                                        <div className="menu-item" onClick={handleOpenFile}>Open File</div>
                                    </div>
                                </div>
                            )}

                        </div>

                        <textarea className="notepad-text-area" id="notepad-text-area"
                                  style={{width: "300px", height: "300px"}}/>

                    </div>


                </div>

            </DraggableWindow>
            {showFileSelector && (
                <FileSelector onClose={() => setShowFileSelector(false)}/>
            )}


        </>
    );


}