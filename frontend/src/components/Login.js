// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import "../styles/Buttons.css";


// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [messageType, setMessageType] = useState('');
//     const navigate = useNavigate();
//     const { login } = useAuth(); // Get the login function from AuthContext


  
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const userCredentials = { email, password };
      
//         try {
//           const response = await axios.post('http://localhost:5000/auth/login', userCredentials);
      
//           if (response.data.access_token) {
//             const token = response.data.access_token;
//             login(token);
//             sessionStorage.setItem("authToken", token);
      
//             // Debugging: Print token
//             console.log("Stored Auth Token:", token);
      
//             // Fetch user profile
//             const profileResponse = await axios.get('http://localhost:5000/api/profile', {
//               headers: { Authorization: `Bearer ${token}` },
//             });
      
//             console.log("Profile Response:", profileResponse.data);
      
//             if (!profileResponse.data.bio) {
//               navigate('/profile-setup');
//             } else {
//               navigate('/profile');
//             }
//           } else {
//             setMessage('Login failed. No token received.');
//             setMessageType('error');
//           }
//         } catch (error) {
//           console.error("Login error:", error.response?.data);
//           setMessage(error.response?.data?.error || 'Error logging in.');
//           setMessageType('error');
//         }
//       };
      
      
      
    
//     return (
//         <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem', textAlign: 'center' }}>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <div style={{ marginBottom: '1rem' }}>
//                     <label htmlFor="email">Email:</label>
//                     <input
//                         type="email"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Enter your email"
//                         required
//                         style={{ width: '100%', padding: '0.5rem' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '1rem' }}>
//                     <label htmlFor="password">Password:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Enter your password"
//                         required
//                         style={{ width: '100%', padding: '0.5rem' }}
//                     />
//                 </div>
//                 <button type="submit" className="btn">
//                     Login
//                 </button>
//             </form>
//             {message && (
//                 <div
//                     style={{
//                         marginTop: '1rem',
//                         padding: '0.5rem',
//                         backgroundColor: messageType === 'success' ? 'lightgreen' : 'lightcoral',
//                         color: messageType === 'success' ? 'green' : 'red',
//                     }}
//                 >
//                     {message}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../styles/Buttons.css";

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
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userCredentials),
            });

            if (!response.ok) {
                throw new Error('Invalid login credentials');
            }

            const data = await response.json();
            if (data.access_token) {
                login(data.access_token, data.refresh_token);

                console.log("Stored Auth Token:", data.access_token);

                // Fetch user profile
                const profileResponse = await fetchWithAuth('http://localhost:5000/api/profile');
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
