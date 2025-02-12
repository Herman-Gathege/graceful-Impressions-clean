// import { createContext, useContext, useState } from 'react';
// import axios from 'axios'

// const AuthContext = createContext();


// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(() => !!sessionStorage.getItem('authToken'));

//     // const [token, setToken] = useState(null);
//     const [token, setToken] = useState(() => sessionStorage.getItem('authToken') || null);

//     const login = (authToken) => {
//         setIsAuthenticated(true);
//         setToken(authToken);
//         sessionStorage.setItem('authToken', authToken); // Or use localStorage
//         sessionStorage.getItem('authToken', authToken);
//         console.log("Stored Auth Token:", authToken);

//     };

//     const logout = () => {
//         setIsAuthenticated(false);
//         setToken(null);
//         sessionStorage.removeItem('authToken');
//     };

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('authToken'));
    const [token, setToken] = useState(() => localStorage.getItem('authToken') || null);

    const refreshToken = async () => {
        try {
            const response = await axios.post('http://localhost:5000/auth/refresh', {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('refreshToken')}` },
            });
            localStorage.setItem('authToken', response.data.access_token);
            return response.data.access_token;
        } catch (error) {
            console.error('Error refreshing token:', error);
            return null;
        }
    };

    const login = (authToken, refreshToken) => {
        setIsAuthenticated(true);
        setToken(authToken);
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('refreshToken', refreshToken);
        console.log("Stored Auth Token:", authToken);
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
