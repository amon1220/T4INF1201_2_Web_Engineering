import React from "react";
import {Navigate, useLocation} from "react-router-dom";

export default function RequireAuth({children}) {
    const token = localStorage.getItem("accessToken");
    const location = useLocation();

    if (!token) {
        return <Navigate to="/Login" state={{from: location}} replace />;
    }

    return children;
}