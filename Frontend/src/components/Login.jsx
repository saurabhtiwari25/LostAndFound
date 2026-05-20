import React, { useState, useContext } from 'react';
import UserService from '../services/userService';
import { AuthContext } from '../context/AuthContext';

const Login = ({ onNavigate }) => {
    // Access the login function from our Global Brain (Context)
    const { login } = useContext(AuthContext);
    
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await UserService.login(credentials);
            // 1. Update the Global State
            login(response.data.name); 
            // 2. Redirect to the list view
            onNavigate('list'); 
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="form-card">
            <h2>Sign In</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <button type="submit" className="primary-btn">Login</button>
            </form>
            
            <p>Don't have an account? 
                <span onClick={() => onNavigate('register')} className="link-text"> Register here</span>
            </p>
        </div>
    );
};

export default Login;