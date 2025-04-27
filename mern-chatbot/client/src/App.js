import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import ChatApp from './ChatApp.js'; 

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<ChatApp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    
  );
}

export default App;
