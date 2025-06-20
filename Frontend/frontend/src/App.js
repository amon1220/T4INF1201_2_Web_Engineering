import './App.css';
import Taskbar from './components/taskbar';

import React, {useState} from "react";
import NotepadButton from "./components/NotepadButton";
import Notepad from "./components/Notepad";
import RecycleBinButton from "./components/RecycleBinButton";
import RecycleBin from "./components/RecycleBin";
import IExplorer from "./components/IExplorer";
import IExplorerButton from "./components/InternetExplorerButton";
import HackingTool3000Button from "./components/HackingTool3000Button";
import HackingTool3000 from "./components/HackingTool3000";
import WeatherApp from "./components/WeatherApp";
import WeatherAppButton from "./components/WeatherAppButton"

function App() {
    const [notepadOpen, setNotepadOpen] = useState(false); // true = geöffnet
    const [recycleBinOpen, setRecycleBinOpen] = useState(false);
    const [hackingToolOpen, setHackingTool3000Open] = useState(false);
    const [iExplorerOpen, setIExplorerOpen] = useState(false);
    const [myComputerOpen, setMyComputerOpen] = useState(false);
    const [weatherAppOpen, setWeatherAppOpen] = useState(false);
    const [startWindowOpen, setStartWindowOpen] = useState(false);

    return (
        <div className="desktop">
            <Taskbar
                openWindows={{
                    notepad: {isOpen: notepadOpen, title: "Notepad"},
                    recycleBin: {isOpen: recycleBinOpen, title: "Recycle Bin"},
                    iExplorer: {isOpen: iExplorerOpen, title: "Internet Explorer"},
                    hackingTool: {isOpen: hackingToolOpen, title: "Hacking Tool 3000"},
                    weatherApp: {isOpen: weatherAppOpen, title: "Weather App"}
                }}
                onWindowClick={{
                    notepad: () => setNotepadOpen(true),
                    recycleBin: () => setRecycleBinOpen(true),
                    iExplorer: () => setIExplorerOpen(true),
                    hackingTool: () => setHackingTool3000Open(true),
                    weatherApp: () => setWeatherAppOpen(true)
                }}
            />

            <RecycleBinButton onOpen={() => setRecycleBinOpen(true)}/>
            {recycleBinOpen && (
                <RecycleBin onClose={() => setRecycleBinOpen(false)}/>
            )}


            <NotepadButton onOpen={() => setNotepadOpen(true)}/>
            {notepadOpen && (
                <Notepad onClose={() => setNotepadOpen(false)}/>
            )}
            <IExplorerButton onOpen={() => setIExplorerOpen(true)}/>
            {iExplorerOpen && (
                <IExplorer onClose={() => setIExplorerOpen(false)}/>
            )}
            <HackingTool3000Button onOpen={() => setHackingTool3000Open(true)}/>
            {hackingToolOpen && (
                <HackingTool3000 onClose={() => setHackingTool3000Open(false)}/>
            )}
            <WeatherAppButton onOpen={() => setWeatherAppOpen(true)}/>
            {weatherAppOpen && (
                <WeatherApp onClose={() => setWeatherAppOpen(false)}/>
            )}

        </div>
    );
}

export default App;
