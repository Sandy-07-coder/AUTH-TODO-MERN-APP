import { createContext,useState,useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [isAuthenticated,setIsAuthenticated] = useState(null);

    return (
        <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext); 