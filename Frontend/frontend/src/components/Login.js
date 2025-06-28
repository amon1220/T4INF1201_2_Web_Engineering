import React, {useState} from "react";
import "../App.css";
import {useNavigate, useLocation} from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const routerLocation = useLocation();
    const from = routerLocation.state?.from?.pathname || "/Desktop";

    const handleClickRegister = () => {
        navigate('/Register');
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password})
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
                throw new Error(errMsg || "Register failed");
            }

            const {accessToken, user} = await res.json();
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("user", JSON.stringify(user));
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || "An error occurred during login");
        }
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
          maxWidth: "100%",
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
              width: "40px",
              height: "40px",
              gridColumn: "1",
              gridRow: "1 / span 3",
            }}
          />

          <p
            style={{
              margin: 5,
              whiteSpace: "nowrap",
              gridColumn: "2",
              gridRow: "1",
            }}
          >
            Type a user name and password to log on to Windows.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              gridColumn: "2",
              gridRow: "2",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "13px",
              }}
            >
              <label
                htmlFor="username"
                style={{
                  minWidth: "80px",
                  marginRight: "8px",
                  color: "black",
                }}
              >
                <span
                  style={{ textDecoration: "underline", color: "black" }}
                >
                  U
                </span>
                ser name:
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ flex: 1 }}
                required
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "13px",
              }}
            >
              <label
                htmlFor="password"
                style={{
                  minWidth: "80px",
                  marginRight: "8px",
                  color: "black",
                }}
              >
                <span
                  style={{ textDecoration: "underline", color: "black" }}
                >
                  P
                </span>
                assword:
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ flex: 1 }}
                required
              />
            </div>

            {error && (
              <div style={{ color: "red", fontSize: "12px" }}>{error}</div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                gridColumn: "3",
                gridRow: "3",
              }}
            >
              <button type="submit">OK</button>
              <button type="button" onClick={handleClickRegister}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
