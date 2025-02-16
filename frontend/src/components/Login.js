import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../styles/Buttons.css";

const API_URL = process.env.REACT_APP_API_URL;
console.log("Backend API URL:", API_URL); // Add this to verify if API_URL is defined


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();
    const { login, fetchWithAuth } = useAuth(); // Get login and fetchWithAuth from AuthContext

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userCredentials = { email, password };
    
        try {
            const response = await fetch(`${API_URL}/auth/login`, {  // ✅ Using env variable
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userCredentials),
            });
    
            if (!response.ok) {
                throw new Error('Invalid login credentials');
            }
    
            const data = await response.json();
            if (data.access_token) {
                login(data.access_token, data.refresh_token, data.user);
                console.log("Stored Auth Token:", data.access_token);
    
                // Fetch user profile
                const profileResponse = await fetchWithAuth(`/api/profile`); // ✅ Using env variable
                if (profileResponse.ok) {
                    const profileData = await profileResponse.json();
                    console.log("Profile Response:", profileData);
    
                    if (!profileData.bio) {
                        navigate('/profile-setup');
                    } else {
                        navigate('/profile');
                    }
                } else {
                    setMessage('Failed to load profile.');
                    setMessageType('error');
                }
            } else {
                setMessage('Login failed. No token received.');
                setMessageType('error');
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage(error.message || 'Error logging in.');
            setMessageType('error');
        }
    };
    

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem', textAlign: 'center' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <button type="submit" className="btn">
                    Login
                </button>
            </form>
            {message && (
                <div
                    style={{
                        marginTop: '1rem',
                        padding: '0.5rem',
                        backgroundColor: messageType === 'success' ? 'lightgreen' : 'lightcoral',
                        color: messageType === 'success' ? 'green' : 'red',
                    }}
                >
                    {message}
                </div>
            )}
        </div>
    );
};

export default Login;
