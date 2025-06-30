import React, {useState} from "react";
import "../App.css";
import {useNavigate} from 'react-router-dom';

/**
 * This function defines the ChangePassword site
 *
 * @returns Html code for the ChangePassword site
 */
export default function ChangePassword() {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleClickBack = () => {
        navigate('/Desktop');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { user_id } = JSON.parse(localStorage.getItem("user")) || {};


        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        } else {
            try {
                const res = await fetch("/api/change_pw", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({user_id, oldPassword, newPassword})
                });

                if (!res.ok) {
                    const contentType = res.headers.get("Content-Type") || "";
                    let errMsg;
                    if (contentType.includes("application/json")) {
                        const {message} = await res.json();
                        errMsg = message;
                    } else {
                        errMsg = await res.text();
                    }
                    throw new Error(errMsg || "Change password failed");
                }
            } catch (err) {
                setError(err.message || "Error");
                return;
            }
        }
        navigate('/Desktop');
    }

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
                    <div className="title-bar-text">Change Password</div>
                    <div className="title-bar-controls">
                        <button aria-label="Help"></button>
                        <button aria-label="Close"></button>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="window-body"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "auto 1fr auto",
                        gridTemplateRows: "auto auto auto",
                        gap: "10px",
                        padding: "10px",
                        alignItems: "start",
                    }}
                >
                    <img
                        src={require("../assets/key_win_alt-2.png")}
                        alt="key icon"
                        style={{
                            width: "40px", height: "40px", gridColumn: "1", gridRow: "1 / span 3",
                        }}
                    />

                    <p
                        style={{
                            margin: 5, whiteSpace: "nowrap", gridColumn: "2", gridRow: "1",
                        }}
                    >
                        Change password for Windows
                    </p>

                    {/* Buttons */}
                    <div
                        style={{
                            display: "flex", gridColumn: "3", gridRow: "1", justifyContent: "flex-end",
                        }}
                    >
                        <button type="submit">OK</button>
                    </div>
                    <div
                        style={{
                            display: "flex", gridColumn: "3", gridRow: "2", justifyContent: "flex-end",
                        }}
                    >
                        <button type="button" onClick={handleClickBack}>
                            Back
                        </button>
                    </div>

                    {/* Form fields */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            gridColumn: "2",
                            gridRow: "2 / span 2",
                        }}
                    >
                        {error && (<div style={{color: "red", fontSize: "13px"}}>{error}</div>)}

                        <div style={{display: "flex", alignItems: "center", fontSize: 13}}>
                            <label style={{minWidth: 80, marginRight: 8}}>
                                <span style={{textDecoration: "underline"}}>O</span>ld Password:
                            </label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                style={{flex: 1}}
                                required
                            />
                        </div>

                        <div style={{display: "flex", alignItems: "center", fontSize: 13}}>
                            <label style={{minWidth: 80, marginRight: 8}}>
                                <span style={{textDecoration: "underline"}}>N</span>ew Password:
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                style={{flex: 1}}
                                required
                            />
                        </div>

                        <div style={{display: "flex", alignItems: "center", fontSize: 13}}>
                            <label style={{minWidth: 80, marginRight: 8}}>
                                <span style={{textDecoration: "underline"}}>C</span>onfirm Password:
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{flex: 1}}
                                required
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>);
}
