import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ onNavigate, currentView }) => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <h2 onClick={() => onNavigate('list')} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible' }}>
                    <defs>
                        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#818cf8" />
                            <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                    </defs>
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="url(#logoGrad)" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="url(#logoGrad)" />
                    <line x1="12" y1="22.08" x2="12" y2="12" stroke="url(#logoGrad)" />
                    {/* Glowing magnifying search lens inside */}
                    <circle cx="12" cy="12" r="3.5" stroke="#f43f5e" fill="rgba(244, 63, 94, 0.1)" strokeWidth="2" />
                    <line x1="14.5" y1="14.5" x2="18" y2="18" stroke="#f43f5e" strokeWidth="2" />
                </svg>
                <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px' }}>Lost & Found</span>
            </h2>
            
            <div className="nav-links">
                <button 
                    onClick={() => onNavigate('list')} 
                    className={currentView === 'list' || currentView === 'detail' ? 'active' : ''}
                >
                    View Items
                </button>
                <button 
                    onClick={() => onNavigate('search')} 
                    className={currentView === 'search' ? 'active' : ''}
                >
                    Search Items
                </button>
                <button 
                    onClick={() => onNavigate('add')} 
                    className={currentView === 'add' ? 'active' : ''}
                >
                    Report Item
                </button>
                
                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '10px', paddingLeft: '15px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #6366f1, #0ea5e9)',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '700',
                                fontSize: '13px',
                                boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)'
                            }}>
                                {user[0].toUpperCase()}
                            </div>
                            <span style={{ color: '#e2e8f0', fontSize: '13.5px', fontWeight: '600' }}>{user}</span>
                        </div>
                        <button onClick={logout} className="logout-btn" style={{ padding: '8px 16px', fontSize: '13px' }}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '10px', paddingLeft: '15px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                        <button 
                            onClick={() => onNavigate('login')}
                            className={currentView === 'login' ? 'active' : ''}
                            style={{ border: 'none', background: 'transparent' }}
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => onNavigate('register')}
                            className={currentView === 'register' ? 'active' : ''}
                            style={{ background: 'linear-gradient(135deg, var(--color-primary), #4f46e5)', border: 'none', color: 'white' }}
                        >
                            Register
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;