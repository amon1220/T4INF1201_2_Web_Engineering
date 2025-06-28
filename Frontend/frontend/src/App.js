import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Desktop from './components/Desktop';
import Login from './components/Login';
import Register from './components/Register';
import ChangePassword from "./components/ChangePassword";
import RequireAuth from "./components/RequireAuth";

/**
 * App is the main component of the application, it the routs
 *
 * @returns {JSX.Element} The router with the correct routes for the sites
 */
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/Desktop" element={
                    <RequireAuth>
                        <Desktop/>
                    </RequireAuth>
                }/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path="/ChangePassword" element={<ChangePassword/>}/>
                <Route path="*" element={<Navigate to="/Login" replace/>}/>
            </Routes>
        </Router>
    );
}

export default App;