import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!sessionStorage.getItem('authToken'));

    // const [token, setToken] = useState(null);
    const [token, setToken] = useState(() => sessionStorage.getItem('authToken') || null);

    const login = (authToken) => {
        setIsAuthenticated(true);
        setToken(authToken);
        sessionStorage.setItem('authToken', authToken); // Or use localStorage
        sessionStorage.getItem('authToken', authToken);
        console.log("Stored Auth Token:", authToken);

    };

    const logout = () => {
        setIsAuthenticated(false);
        setToken(null);
        sessionStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
