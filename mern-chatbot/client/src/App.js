import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); 

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text: input }]);

    setIsTyping(true); 

    try {
      const res = await axios.post("http://localhost:5002/chat", {
        message: input,
      });

      setMessages(prev => [...prev, { sender: "bot", text: res.data.reply }]);
    } catch (err) {
      console.error("Error:", err);
    }

    setInput("");
    setIsTyping(false); 
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <h1>ChatBot</h1>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="typing-indicator"></div>} 
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} disabled={!input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
