import { createContext, useState, useContext } from "react";
import api from "../API/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const logout = async () => {
        try {
            await api.post('/auth/logout');
            setIsAuthenticated(null);
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            // Clear local state even if API call fails
            setIsAuthenticated(null);
            return { success: false, error: error.message };
        }
    };

    const checkAuthStatus = async () => {
        try {
            // You can create a /auth/verify endpoint to check if token is valid
            // For now, we'll rely on the cookie being present
            const response = await api.get('/auth/verify');
            if (response.data.user) {
                setIsAuthenticated(response.data.user);
                return true;
            }
            return false;
        } catch (error) {
            setIsAuthenticated(null);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            logout,
            checkAuthStatus
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext); 