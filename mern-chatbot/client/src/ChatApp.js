import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; 

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); 
  const [darkMode, setDarkMode] = useState(false);

  useEffect(()=>{
    const savedMessages =  localStorage.getItem("chatMessages");

    if(savedMessages){
      setMessages(JSON.parse(savedMessages));
    }
  },[]);
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

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
    <div className={`chat-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="theme-toggle">
        <button onClick={() => setDarkMode(prev => !prev)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <h1>ChatBot</h1>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender}>
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

export default ChatApp;
