import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Footer = () => {
    const { user } = useContext(AuthContext);
    const year = new Date().getFullYear();

    return (
        <footer className="app-footer">
            <div className="footer-content">
                <p>&copy; {year} Lost & Found System</p>
                
                <div className="status-indicator">
                    <span>System: <strong style={{ color: '#28a745' }}>● Online</strong></span>
                    <span className="divider">|</span>
                    <span> 
                        User Session: <strong>{user ? user : 'Guest'}</strong>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;