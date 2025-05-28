import React, { useState } from 'react';

const UrlInputForm = () => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return alert("Please enter a URL.");
    console.log("Submitted URL:", url);
    // TODO: Backend integration
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Paste video URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Download</button>
    </form>
  );
};

export default UrlInputForm;
