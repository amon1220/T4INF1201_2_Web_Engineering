import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Desktop from './components/Desktop';
import Login from './components/Login';
import Register from './components/Register';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/Desktop" element={<Desktop/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path="*" element={<Navigate to="/Login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;