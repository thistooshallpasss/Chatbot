import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_URL = 'http://localhost:3001/api';

// Helper function: Token ko headers aur localStorage mein set karein
const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token);
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token');
    }
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Default true rakhein

    // Yeh useEffect sirf ek baar app load hone par chalega
    useEffect(() => {
        const loadUser = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setAuthToken(storedToken); // Header set karein
                try {
                    // Token ko validate karein aur user fetch karein
                    const res = await axios.get(`${API_URL}/auth/me`);
                    setUser(res.data);
                    setToken(storedToken);
                    setIsAuthenticated(true);
                } catch (err) {
                    // Token galat ya expired tha
                    setAuthToken(null);
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []); // [] khaali array ka matlab hai "sirf ek baar chalao"

    // Naya Signup function
    const signup = async (name, email, password) => {
        setLoading(true);
        try {
            // 1. Register karein aur token lein
            const res = await axios.post(`${API_URL}/auth/register`, { name, email, password });
            setAuthToken(res.data.token); // Token save karein

            // 2. Turant user ki details fetch karein
            const userRes = await axios.get(`${API_URL}/auth/me`);

            // 3. State update karein
            setUser(userRes.data);
            setToken(res.data.token);
            setIsAuthenticated(true);
            setLoading(false);
        } catch (err) {
            setAuthToken(null); // Fail hone par token clear karein
            setLoading(false);
            throw err; // Error ko component tak bhejें
        }
    };

    // Naya Login function
    const login = async (email, password) => {
        setLoading(true);
        try {
            // 1. Login karein aur token lein
            const res = await axios.post(`${API_URL}/auth/login`, { email, password });
            setAuthToken(res.data.token); // Token save karein

            // 2. Turant user ki details fetch karein
            const userRes = await axios.get(`${API_URL}/auth/me`);

            // 3. State update karein
            setUser(userRes.data);
            setToken(res.data.token);
            setIsAuthenticated(true);
            setLoading(false);
        } catch (err) {
            setAuthToken(null); // Fail hone par token clear karein
            setLoading(false);
            throw err; // Error ko component tak bhejें
        }
    };

    // Naya Logout function
    const logout = () => {
        setAuthToken(null); // Token clear karein
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated,
                loading,
                signup,
                login,
                logout,
            }}
        >
            {/* Jab tak loading true hai, app ko na dikhayein */}
            {!loading && children}
        </AuthContext.Provider>
    );
};