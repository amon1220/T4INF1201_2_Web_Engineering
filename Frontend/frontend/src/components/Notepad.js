import React, {useState, useEffect, useRef} from "react";
import "../App.css";
import '98.css';
import DraggableWindow from "./draggableWindow.js";


/**
 * This function is for the Filetable, where you can select Textfiles.
 * @param onClose function to be called when the window is closed
 * @param notepads List of notepad objects to display in the table.
 * @param setTextContent updates the textarea with the test of the selected file
 * @returns {JSX.Element} returns the rendering table
 */
export function FileSelector({onClose, notepads, setTextContent, setNotepads}) {
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [error, setError] = useState("");
    const tableRef = useRef(null);

    /**
     * When the FileSelector is loaded:
     * Gets the table. Defines a function that, when something in the table is
     * clicked it looks witch row in <tbody> it is and saves it in SelectedRowIndex.
     * Removes all errors (when the user clicks open before selecting the error would stick around otherwise)
     * Adds the function to the table.
     * Cleans Up.
     */
    //BE CAREFUL WHEN LETTING THIS FUNCTION SET AN ERROR idk why I cant do it in the first line,
    // had to be at the end, too bad
    useEffect(() => {
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

    /**
     * Sets the text in the Notepad textarea to the saved text from the selected notepad.
     *
     */
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

    /**
     * Deletes the selected notepad from the database with a api call.
     * On success, removes the deleted notepad from the local state and clears the selection.
     * On failure, shows an error message. (hopefully will never happen because the error does not format html)
     *
     * @returns {Promise<void>}
     * @param {Event} e - The button submission event.
     */
    const handleDeleteFileInner = async (e) => {
        e.preventDefault()
        if (selectedRowIndex !== null) {
            const selectedNotepad = notepads[selectedRowIndex];

            try {
                const res = await fetch("/api/notepad/" + selectedNotepad.notepad_id, {method: "DELETE"});

                if (!res.ok) {
                    const msg = await res.text();
                    throw new Error(msg || "Deleting notepad failed");
                }

                setNotepads((prevNotepads) =>
                    prevNotepads.filter((_, index) => index !== selectedRowIndex)
                );

                setSelectedRowIndex(null); // Clear selection after deletion

            } catch (err) {
                console.error("Failed to fetch notepads:", err);
                setError(err.message || "An error occurred while Deleting notepads");
            }


        } else {
            setError("Please select a file first.");
        }
    };


    /**
     * turns a string like "something something" to "some..." when max length is 7
     *
     * @param {String} str Any string
     * @param {integer} maxLength Any number
     * @returns {String} The string cut off after maxLength symbols but also with the last 3 replaced with ...
     */
    function truncate(str, maxLength) {
        return str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str;
    }

    /**
     * Formats new Date().toISOString() objects in the format HH:SS DD/MM/YYYY
     *
     * @param {String} isoString ISO 8601 date-time string
     * @returns {String}
     */
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
                        <button onClick={handleDeleteFileInner}>Delete</button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </DraggableWindow>
    );
}


/**
 * This function represent the Notepad, where you can type Notes.
 * The buttons File opens the menu to the buttons Save File and Open File.
 * Save File: Current text is saved.
 * Open File: Opens a Table, where you can selected saved Files.
 *
 * @param onClose
 * @returns {JSX.Element}
 */

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

    /**
     * Trys to get all notepads from the logged-in user
     * then saves them and calls shows the file selector.
     *
     * @param {Event} e - The button submission event.
     * @returns {Promise<void>}
     */
    const handleOpenFileOuter = async (e) => {
        e.preventDefault();
        const userString = localStorage.getItem("user");
        const user = JSON.parse(userString);
        const userId = user.user_id;

        try {
            const res = await fetch("/api/notepads/fromUser/" + userId, {method: "GET"});

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

    /**
     * Collects all relevant data and trys to post it to the api.
     * Gives apropriate response to the user on success and failure
     *
     *
     * @param {Event} e - The button submission event.
     * @returns {Promise<void>}
     */
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

    // <statusbar style={{position: 'relative'}}> gave an error but
    // <div className="statusbar" style={{position: 'relative'}}> seems to work the same
    // Rendering of the Notepad and menus
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
                              setNotepads={setNotepads}
                />
            )}


        </>
    );


}