import './App.css';
import Taskbar from './components/taskbar';

import React, { useState } from "react";
import NotepadButton from "./components/NotepadButton";
import Notepad from "./components/Notepad";

function App() {
    return (
        <div className="desktop">
            {/* später hier Icons oder Fenster */}
            <Taskbar />
            <NotepadButton />
            <Notepad />
        </div>
    );
}

export default App;
