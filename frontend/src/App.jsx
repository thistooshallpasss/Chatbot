import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import InfoModal from './components/InfoModal';
import Sidebar from './components/Sidebar'; // Sidebar import karein
// App.css ko main.jsx mein move kar diya hai

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/chat`;

function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      if (isAuthenticated) {
        try {
          const res = await axios.get(`${API_URL}/history`);
          setMessages(res.data);
        } catch (err) {
          console.error('Error fetching history:', err);
          setMessages([
            { sender: 'bot', text: 'Hi! Aapki chat history load nahi ho payi.' }
          ]);
        }
      } else {
        setMessages([
          { sender: 'bot', text: 'Hi! Login karke aap apni chat history save kar sakte hain.' }
        ]);
      }
    };
    fetchHistory();
  }, [isAuthenticated]);

  const handleSendMessage = async (userInput) => {
    // ... (Yeh function pehle jaisa hi hai, koi change nahi)
    const newUserMessage = { sender: 'user', text: userInput };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);

    try {
      let endpoint = isAuthenticated ? `${API_URL}/` : `${API_URL}/anonymous`;
      const res = await axios.post(endpoint, { message: userInput });
      const botResponse = { sender: 'bot', text: res.data.response };
      setMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      console.error('Error fetching bot response:', err);
      const errResponse = { sender: 'bot', text: 'Sorry, kuch problem aa gayi hai.' };
      setMessages((prev) => [...prev, errResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  // Naya layout (div.app-wrapper)
  return (
    <div className={`app-wrapper ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {isAuthenticated && <Sidebar isOpen={isSidebarOpen} messages={messages} />}

      <div className="app-container">
        <Header
          onInfoClick={() => setIsModalOpen(true)}
          onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <ChatWindow messages={messages} isTyping={isTyping} />
        <InputBar onSendMessage={handleSendMessage} />
      </div>

      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;