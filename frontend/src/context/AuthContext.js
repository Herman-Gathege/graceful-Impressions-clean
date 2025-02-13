import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('authToken'));
    const [token, setToken] = useState(() => localStorage.getItem('authToken') || null);

    const refreshToken = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                console.error("No refresh token found!");
                return null;
            }
    
            const response = await axios.post("http://localhost:5000/auth/refresh", {}, {
                headers: { Authorization: `Bearer ${refreshToken}` },
            });
    
            localStorage.setItem("authToken", response.data.access_token);
            return response.data.access_token;
        } catch (error) {
            console.error("Error refreshing token:", error.response?.data || error);
            return null;
        }
    };
    

    const login = (authToken, refreshToken, userData) => {
        setIsAuthenticated(true);
        setToken(authToken);
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('refreshToken', refreshToken);
    
        if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
        }
    
        console.log("Stored Auth Token:", authToken);
        console.log("Stored User Data:", userData);
    };
    
    

    const logout = () => {
        setIsAuthenticated(false);
        setToken(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
    };

    const fetchWithAuth = async (url, options = {}) => {
        let token = localStorage.getItem('authToken');
        let response = await fetch(url, {
            ...options,
            headers: { ...options.headers, Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
            token = await refreshToken();
            if (!token) return response;
            response = await fetch(url, {
                ...options,
                headers: { ...options.headers, Authorization: `Bearer ${token}` },
            });
        }
        return response;
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, token, fetchWithAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
