import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import "../styles/Buttons.css";


function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: formData.name,
            email: formData.email,
            password1: formData.password,
            password2: formData.confirmPassword,
        };

        setErrorMessage('');

        try {
            // const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, data);
            const res = await axios.post(`http://localhost:5000/auth/signup`, data);

            alert(res.data.message);

            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error("Error Details:", error.response?.data || error.message);
            setErrorMessage(error.response?.data?.error || 'Error signing up');
        }
        
    };

   
    

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem', textAlign: 'center' }}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Name input */}
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                    />
                </div>

                {/* Email input */}
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                    />
                </div>

                {/* Password input */}
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password1"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                    />
                </div>

                {/* Confirm Password input */}
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        id="Password2"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                    />
                </div>

                {/* Error message for password mismatch */}
                {errorMessage && <p style={{ color: 'red', marginBottom: '1rem' }}>{errorMessage}</p>}

                {/* Submit button */}
                <button
                    type="submit"
                    className='btn'
                >
                    Sign Up
                </button>
            </form>

            {/* Login option */}
            <p style={{ marginTop: '1rem' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
                    Login here
                </Link>
            </p>
        </div>
    );
}

export default Signup;