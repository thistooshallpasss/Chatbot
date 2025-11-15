import React from 'react';


function InfoModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Bot ki Limitations</h2>
                <p>
                    Main ek simple AI chatbot hoon jo `node-nlp` par bana hai. Main aapke
                    sawaalon ke intent ko samajh sakta hoon.
                </p>
                <p>Aap mujhse yeh sab pooch sakte hain:</p>
                <ul>
                    <li>Greetings (Hi, Hello)</li>
                    <li>Jokes (Tell me a joke)</li>
                    <li>Gossip (Any gossip?)</li>
                    <li>Time (What is the time?)</li>
                    <li>Mera naam (Who am I?)</li>
                    <li>Aur bhi bahut kuch...</li>
                </ul>
                <p>
                    Main internet browse nahi kar sakta ya real-time jaankari (jaise
                    weather) nahi de sakta.
                </p>
                <button onClick={onClose} className="modal-close-button">
                    Got it!
                </button>
            </div>
        </div>
    );
}

export default InfoModal;