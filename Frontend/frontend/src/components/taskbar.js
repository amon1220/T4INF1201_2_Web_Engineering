import '../App.css';
import '98.css';
import React, { useEffect, useState } from "react";
import weatherIcon from '../assets/WeatherAppImage.png';

export default function Taskbar({openWindows, onWindowClick}) {
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

    function updateTime() {
        const currenttime = new Date().toLocaleTimeString();
        document.getElementById("currenttime").textContent = currenttime;
    }

    useEffect(() => {
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const getIconForWindow = (windowType) => {
        switch (windowType) {
            case 'notepad':
                return 'https://win98icons.alexmeub.com/icons/png/address_book_pad.png';
            case 'recycleBin':
                return 'https://win98icons.alexmeub.com/icons/png/recycle_bin_empty_cool-2.png';
            case 'iExplorer':
                return 'https://win98icons.alexmeub.com/icons/png/msie1-2.png';
            case 'hackingTool':
                return 'https://win98icons.alexmeub.com/icons/png/window_red_hilights.png';
            case 'weatherApp':
                return weatherIcon;
            default:
                return 'https://win98icons.alexmeub.com/icons/png/application-0.png';
        }
    };


        function StartWindow() {
            const [hoveredItem, setHoveredItem] = useState(null);

            return (
                <div className="window"
                     style={{
                         position: "absolute",
                         bottom: "38.5px",
                         left: "0",
                         zIndex: 9999
                     }}>
                    <div className="window-body" style={{
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <div className="menu">
                            <div
                                className="menu-item"
                                onMouseEnter={() => setHoveredItem("Settings")}
                                onMouseLeave={() => setHoveredItem(null)}
                            >➤  Settings
                                {hoveredItem === "Settings" && (
                                    <div className="submenu">
                                        <div className="menu-item" style={{color: "black"}} >Change Password</div>
                                    </div>
                                )}
                            </div>
                            <div className="menu-item">Logout</div>
                            <div className="menu-item">Shut Down</div>
                        </div>
                    </div>
                </div>
            );
        }

    const toggleStartMenu = () => {
        setIsStartMenuOpen(!isStartMenuOpen);
    };

    return (
        <div className="taskbar">
            <button
                className={`start-button ${isStartMenuOpen ? 'active' : ''}`}
                onClick={toggleStartMenu}
            >
                <img src="https://win98icons.alexmeub.com/icons/png/windows-0.png" alt="start" />
                Start
            </button>
            <div style= {{}} className="spacer">||</div>
            <div className="taskbar-windows">
                {Object.entries(openWindows || {}).map(([key, window]) => (
                    window.isOpen && (
                        <button
                            key={key}
                            className="taskbar-window-button"
                            onClick={() => onWindowClick[key]()}
                        >
                            <img
                                src={getIconForWindow(key)}
                                alt=""
                                style={{ width: '16px', height: '16px', marginRight: '4px' }}
                            />
                            {window.title}
                        </button>
                    )
                ))}
            </div>


            <div className="clock">
                <div id="currenttime"></div>
            </div>
            {isStartMenuOpen && <StartWindow />}
        </div>
    );
}