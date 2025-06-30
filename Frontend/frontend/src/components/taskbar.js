import '../App.css';
import '98.css';
import React, {useEffect, useState} from "react";
import weatherIcon from '../assets/WeatherAppImage.png';
import {useNavigate} from "react-router-dom";
//IDK why it works like this and not with the path directly
import shutdownIcon from '../assets/shut_down_normal-3.png';
import LogoutIcon from '../assets/key_win-0.png';
import SettingsIcon from '../assets/settings_gear_cool-4.png';
import ChangePassword from "./ChangePassword";

export default function Taskbar({openWindows, onWindowClick}) {
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleChangePassword = () => {
        navigate('/ChangePassword');
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate('/Login');
    };
    //IDK if it should do something different
    const handleShutdown = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate('/Login');
    };

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
        //IDK why I cant do html comments in the return and also I cant change the fact that the underlined text is the wrong color when hoverd over
        // also alt is purposefully left empty because when the image doesn't load, it doesn't, there is already text explaining it
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
                        ><img src={SettingsIcon} alt={""} className="menu-icon"/>
                            <span style={{textDecoration: "underline", color: "black"}}>S</span>ettings ➤
                            {hoveredItem === "Settings" && (
                                <div className="submenu">
                                    <div className="menu-item" style={{color: "black"}}
                                         onClick={handleChangePassword}>
                                        Change Password
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="menu-item" onClick={handleLogout}>
                            <img src={LogoutIcon} alt={""} className="menu-icon"/>
                            <span style={{textDecoration: "underline", color: "black"}}>L</span>og Off
                        </div>

                        <div className="menu-item" onClick={handleShutdown}>
                            <img src={shutdownIcon} alt={""} className="menu-icon"/>
                            Sh<span style={{textDecoration: "underline", color: "black"}}>u</span>t Down...
                        </div>
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
                <img src="https://win98icons.alexmeub.com/icons/png/windows-0.png" alt="start"/>
                Start
            </button>
            <div style={{}} className="spacer">||</div>
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
                                style={{width: '16px', height: '16px', marginRight: '4px'}}
                            />
                            {window.title}
                        </button>
                    )
                ))}
            </div>


            <div className="clock">
                <div id="currenttime"></div>
            </div>
            {isStartMenuOpen && <StartWindow/>}
        </div>
    );
}