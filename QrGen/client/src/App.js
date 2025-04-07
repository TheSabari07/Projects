import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [inputValue, setValue] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const handleGenerate = () => {
    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(inputValue)}&size=150x150`;
    setQrUrl(url);
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Enter a text'
        value={inputValue}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Typed: {inputValue}</p>

      <button onClick={handleGenerate}>Generate</button>

      {qrUrl && (
        <div>
          <img src={qrUrl} alt="QR Code" />
          <br />
          <a href={qrUrl} download="qr-code.png">
            <button>Download</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
