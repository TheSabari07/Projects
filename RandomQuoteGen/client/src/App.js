import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; 

const App = () => {
  const [quote, setQuote] = useState("");  
  const [author, setAuthor] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const fetchQuote = async () => {
    try {
      const res = await axios.get("http://localhost:5001/quotes/random");
      setQuote(res.data.text);
      setAuthor(res.data.author);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className="container">
      <h1>Random Quote Generator</h1>
      <p className="quote">"{quote}"</p>
      <p className="author">- {author}</p>
      <button onClick={fetchQuote}>New Quote</button>
      <button onClick={toggleDarkMode} style={{ marginLeft: "10px" }}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default App;
