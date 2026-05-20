import React, { useState } from 'react';
import UserService from '../services/userService';

const Register = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await UserService.register(formData);
            alert("Account created successfully!");
            onNavigate('login');
        } catch (err) {
            alert("Registration failed. Email might already be in use.");
        }
    };

    return (
        <div className="form-card">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Full Name</label>
                    <input type="text" name="name" onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" name="email" onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" name="password" onChange={handleChange} required />
                </div>
                <button type="submit" className="primary-btn">Sign Up</button>
            </form>
        </div>
    );
};

export default Register;