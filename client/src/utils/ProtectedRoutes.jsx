import { Outlet,Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import React from 'react'

const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth();
    
    return isAuthenticated ? < Outlet /> : <Navigate to="/auth/login" />
}

export default ProtectedRoutes
