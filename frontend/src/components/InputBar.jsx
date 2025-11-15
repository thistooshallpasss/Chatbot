import React, { useState } from 'react';

function InputBar({ onSendMessage }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Page ko reload hone se rokein
        if (input.trim()) {
            onSendMessage(input);
            setInput(''); // Input ko khali karein
        }
    };

    return (
        <form className="input-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
    );
}

export default InputBar;