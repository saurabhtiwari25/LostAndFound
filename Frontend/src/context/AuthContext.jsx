import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("userName");
        if (savedUser) setUser(savedUser);
    }, []);

    const login = (name) => {
        localStorage.setItem("userName", name);
        setUser(name);
    };

    const logout = () => {
        localStorage.removeItem("userName");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};