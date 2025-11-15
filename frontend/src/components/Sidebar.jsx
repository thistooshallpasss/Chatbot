import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../App.css'; // Styles ke liye

function Sidebar({ isOpen, messages }) {
    const { user } = useAuth();

    // History ko unique 'conversations' mein group karein (Optional, but cool)
    // Abhi ke liye, hum simple list dikhayenge.
    const chatHistory = messages
        .filter((msg) => msg.sender === 'user')
        .slice(-10) // Puraane 10 messages
        .reverse();

    if (!user) {
        return null; // Agar logged in nahi hai, toh kuch nahi dikhayein
    }

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <h3>Chat History</h3>
            <p>Welcome, {user.name}!</p>
            <ul className="history-list">
                {chatHistory.length > 0 ? (
                    chatHistory.map((msg, index) => (
                        <li key={index} className="history-item">
                            {msg.text.substring(0, 30)}...
                        </li>
                    ))
                ) : (
                    <p>Aapki abhi koi chat history nahi hai.</p>
                )}
            </ul>
        </div>
    );
}

export default Sidebar;