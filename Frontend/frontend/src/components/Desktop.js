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

    // Shared state for all windows
    const [windows, setWindows] = useState({
        notepad: {active: false, visible: false, title: "Notepad"},
        recycleBin: {active: false, visible: false, title: "Recycle Bin"},
        iExplorer: {active: false, visible: false, title: "Internet Explorer"},
        hackingTool: {active: false, visible: false, title: "Hacking Tool 3000"},
        weatherApp: {active: false, visible: false, title: "Weather App"},
    });

    //SPA Frontend of Desktop starts here, cant write comments inside of return statements,
    // this just opens up each Pop-up by the OnClick determined in every component file

    // Functions to manage window states
    const openWindow = (window) => {
        setWindows(prev => ({
            ...prev,
            [window]: {...prev[window], active: true, visible: true}
        }));
    }

    const minimizeWindow = (window) => {
        setWindows(prev => ({
            ...prev,
            [window]: {...prev[window], active: true, visible: false}
        }));
    }

    const closeWindow = (window) => {
        setWindows(prev => ({
            ...prev,
            [window]: {...prev[window], active: false, visible: false}
        }));
    }
    /**
     * When this site is loaded:
     * Attempts to play the Windows 95 startup sound.
     * If autoplay is blocked log it.
     */
    useEffect(() => {
        const audio = new Audio("/Microsoft_Windows_95_Startup_Sound.mp3");
        audio.play().catch(e => {
            // Some browsers block autoplay
            console.log("Autoplay failed:", e);
        });
    }, []);

    return (
        <div className="desktop">
            <Taskbar
                windows={windows}
                onWindowClick={(key) => windows[key].visible ? minimizeWindow(key) : openWindow(key)
                }
            />

            <RecycleBinButton onOpen={() => openWindow("recycleBin")}/>
            {windows.recycleBin.visible && (
                <RecycleBin
                    onMinimize={() => minimizeWindow("recycleBin")}
                    onClose={() => closeWindow("recycleBin")}
                />
            )}


            <NotepadButton onOpen={() => openWindow("notepad")}/>
            {windows.notepad.visible && (
                <Notepad
                    onMinimize={() => minimizeWindow("notepad")}
                    onClose={() => closeWindow("notepad")}
                />
            )}

            <IExplorerButton onOpen={() => openWindow("iExplorer")}/>
            {windows.iExplorer.visible && (
                <IExplorer
                    onMinimize={() => minimizeWindow("iExplorer")}
                    onClose={() => closeWindow("iExplorer")}
                />
            )}

            <HackingTool3000Button onOpen={() => openWindow("hackingTool")}/>
            {windows.hackingTool.visible && (
                <HackingTool3000
                    onMinimize={() => minimizeWindow("hackingTool")}
                    onClose={() => closeWindow("hackingTool")}
                />
            )}
            <WeatherAppButton onOpen={() => openWindow("weatherApp")}/>
            {windows.weatherApp.visible && (
                <WeatherApp
                    onMinimize={() => minimizeWindow("weatherApp")}
                    onClose={() => closeWindow("weatherApp")}
                />
            )}

        </div>
    );
}

export default Desktop;