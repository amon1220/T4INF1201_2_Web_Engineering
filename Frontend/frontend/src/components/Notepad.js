import React, {useState, useEffect, useRef} from "react";
import "../App.css";
import '98.css';
import DraggableWindow from "./draggableWindow.js";

export function FileSelector({onClose, notepads, setTextContent}) {
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [error, setError] = useState("");
    const tableRef = useRef(null);

    useEffect(() => { //BE CAREFUL WHEN LETTING THIS FUNCTION SET AN ERROR idk why i cant do it in the first line, too bad
        const table = tableRef.current;
        if (!table) return;

        const handleClick = (event) => {
            const row = event.target.closest('tr');
            if (!row || !row.parentElement || row.parentElement.tagName !== 'TBODY') return;

            const rows = Array.from(table.querySelectorAll('tbody tr'));
            const index = rows.indexOf(row);

            setSelectedRowIndex(index);
            setError(""); //HERE
        };

        table.addEventListener('click', handleClick);

        return () => table.removeEventListener('click', handleClick);
    }, []);

    const handleOpenFileInner = () => {
        if (selectedRowIndex !== null) {
            const selectedNotepad = notepads[selectedRowIndex];
            //console.log('Selected row:', selectedNotepad);
            setTextContent(selectedNotepad.saved_text)
            onClose();

        } else {
            setError("Please select a file first.");
        }
    };

    function truncate(str, maxLength) {
        return str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str;
    }

    function formatDateTime(isoString) {
        const date = new Date(isoString);
        const time = date.toLocaleTimeString('en-GB', {hour12: false});
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${time} ${day}/${month}/${year}`;
    }

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
                            <table className="table-notepad interactive" ref={tableRef}>
                                <thead>
                                <tr>
                                    <th>Content</th>
                                    <th>Creation date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {notepads.map((notepad, index) => (
                                    <tr key={notepad.notepad_id}
                                        className={index === selectedRowIndex ? 'highlighted' : ''}>
                                        <td>{truncate(notepad.saved_text, 10)}</td>
                                        <td>{formatDateTime(notepad.created)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="field-row" style={{justifyContent: "flex-end", padding: "10px"}}>
                        <div style={{color: "red", fontSize: "12px"}}>{error}</div>
                        <button onClick={handleOpenFileInner}>Open</button>
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
    const [notepads, setNotepads] = useState([]);
    const [textContent, setTextContent] = useState("");
    const [success, setSuccess] = useState("");

    function startNotpadFileMenu() {
        setFileMenuOpen(!fileMenuOpen);
    }

    const handleOpenFileOuter = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/notepads", {method: "GET"});

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg || "Fetching notepads failed");
            }

            const data = await res.json();
            setNotepads(data);
            setShowFileSelector(true);
        } catch (err) {
            console.error("Failed to fetch notepads:", err);
            setError(err.message || "An error occurred while fetching notepads");
        }

        setFileMenuOpen(false);
    };

    const handleClickSaveFile = async (e) => {
        e.preventDefault();
        const userString = localStorage.getItem("user");
        const user = JSON.parse(userString);
        const userId = user.user_id;
        const currentTime = new Date().toISOString();
        const notepadContend = document.getElementById("notepad-text-area").value;

        try {
            const res = await fetch("/api/notepad", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    user_id: userId,
                    saved_text: notepadContend,
                    created: currentTime,
                })
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg.message || "Saving failed");
            }
            setSuccess("Success");
            setError("");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(err.message || "An error occurred during Saving");
            setSuccess("");
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

                            {success && <span style={{color: 'green', fontSize: '12px'}}>{success}</span>}
                            {error && <span style={{color: 'red', fontSize: '12px'}}>{error}</span>}
                            {fileMenuOpen && (
                                <div className="window-body" style={{
                                    padding: 0,
                                    margin: 0
                                }}>
                                    <div className="menu">
                                        <div className="menu-item" onClick={handleClickSaveFile}>Save File</div>
                                        <div className="menu-item" onClick={handleOpenFileOuter}>Open File</div>
                                    </div>
                                </div>
                            )}

                        </div>

                        <textarea
                            className="notepad-text-area"
                            id="notepad-text-area"
                            style={{width: "300px", height: "300px"}}
                            value={textContent}
                            onChange={(e) => setTextContent(e.target.value)}
                        />

                    </div>


                </div>

            </DraggableWindow>
            {showFileSelector && (
                <FileSelector onClose={() => setShowFileSelector(false)}
                              notepads={notepads}
                              setTextContent={setTextContent}
                />
            )}


        </>
    );


}