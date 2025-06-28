import React, {useEffect, useState} from "react";
import "../App.css"
import Taskbar from "./taskbar";
import RecycleBinButton from "./RecycleBinButton";
import RecycleBin from "./RecycleBin";
import NotepadButton from "./NotepadButton";
import Notepad from "./Notepad";
import IExplorerButton from "./InternetExplorerButton";
import IExplorer from "./IExplorer";
import HackingTool3000Button from "./HackingTool3000Button";
import HackingTool3000 from "./HackingTool3000";
import WeatherAppButton from "./WeatherAppButton";
import WeatherApp from "./WeatherApp";

function Desktop() {
//Variables to determine the State of the Popups on screen
    const [notepadOpen, setNotepadOpen] = useState(false); // true = geöffnet
    const [recycleBinOpen, setRecycleBinOpen] = useState(false);
    const [hackingToolOpen, setHackingTool3000Open] = useState(false);
    const [iExplorerOpen, setIExplorerOpen] = useState(false);
    const [myComputerOpen, setMyComputerOpen] = useState(false);
    const [weatherAppOpen, setWeatherAppOpen] = useState(false);
    const [startWindowOpen, setStartWindowOpen] = useState(false);
    //SPA Frontend of Desktop starts here, cant write comments inside of return statements, this just opens up each Pop-up by the OnClick determined in every component file
    useEffect(() => {
        const audio = new Audio("/Microsoft_Windows_95_Startup_Sound.mp3");
        audio.play().catch(e => {
            // Some browsers block autoplay
            console.warn("Autoplay failed:", e);
        });
    }, []);

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

export default Desktop;