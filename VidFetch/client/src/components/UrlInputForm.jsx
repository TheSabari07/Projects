import React, { useState } from 'react';

const UrlInputForm = () => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return alert("Please enter a URL.");
    console.log("Submitted URL:", url);
    setUrl("");
    // TODO: Backend integration
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl">
      <input
        type="text"
        placeholder="Paste video URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Download
      </button>
    </form>
  );
};

export default UrlInputForm;
