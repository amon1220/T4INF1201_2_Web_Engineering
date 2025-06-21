import React from "react";
import "../App.css";
import {useNavigate} from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const handleClickRegister = () => {
        navigate('/Register');
    };

    const handleClickOk = () => {
        navigate('/Desktop');
    };

    return (
        <div className="desktop">
            <div
                className="window"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    padding: "8px",
                    width: "fit-content",
                    maxWidth: "100%"
                }}
            >
                <div className="title-bar">
                    <div className="title-bar-text">Welcome to Windows</div>
                    <div className="title-bar-controls">
                        <button aria-label="Help"></button>
                        <button aria-label="Close"></button>
                    </div>
                </div>

                <div
                    className="window-body"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "auto 1fr auto",
                        gridTemplateRows: "auto auto",
                        gap: "10px",
                        padding: "10px",
                        alignItems: "start"
                    }}
                >
                    <img
                        src={require("../assets/key_win_alt-2.png")}
                        alt="key icon"
                        style={{width: "40px", height: "40px", gridColumn: "1", gridRow: "1 / span 2"}}
                    />

                    <p style={{margin: 5, whiteSpace: "nowrap", gridColumn: "2", gridRow: "1"}}>
                        Type a user name and password to log on to Windows.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gridColumn: "3",
                            gridRow: "1",
                            justifyContent: "flex-end"
                        }}
                    >
                        <button type="button" onClick={handleClickOk}>
                            OK
                        </button>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gridColumn: "3",
                            gridRow: "2",
                            justifyContent: "flex-end"
                        }}
                    >
                        <button type="button" onClick={handleClickRegister}>
                            Register
                        </button>
                    </div>

                    <form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            gridColumn: "2",
                            gridRow: "3"
                        }}
                    >
                        <div style={{display: "flex", alignItems: "center", fontSize: "13px"}}>
                            <label style={{minWidth: "80px", marginRight: "8px", color: "black"}}>
                                <span style={{textDecoration: "underline", color: "black"}}>U</span>ser name:
                            </label>
                            <input type="text" style={{flex: 1}}/>
                        </div>

                        <div style={{display: "flex", alignItems: "center", fontSize: "13px"}}>
                            <label style={{minWidth: "80px", marginRight: "8px", color: "black"}}>
                                <span style={{textDecoration: "underline", color: "black"}}>P</span>assword:
                            </label>
                            <input type="password" style={{flex: 1}}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
