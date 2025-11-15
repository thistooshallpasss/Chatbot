import React, { useEffect, useRef } from 'react';

// 'isTyping' prop ko receive karein
function ChatWindow({ messages, isTyping }) {
    const endOfMessagesRef = useRef(null);

    // Naya message ya typing indicator aane par automatically scroll karein
    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]); // isTyping ko dependency mein add karein

    return (
        <div className="chat-window">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    // Hum DB se _id bhi use kar sakte hain, par abhi index theek hai
                    className={`chat-message ${msg.sender}`}
                >
                    {msg.text}
                </div>
            ))}

            {/* Jab isTyping true ho, tab yeh div dikhayein */}
            {isTyping && (
                <div className="chat-message bot">
                    Typing...
                </div>
            )}

            <div ref={endOfMessagesRef} />
        </div>
    );
}

export default ChatWindow;