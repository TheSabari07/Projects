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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-4 w-full"
    >
      <input
        type="text"
        placeholder="Paste video URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
      >
        Download
      </button>
    </form>
  );
};

export default UrlInputForm;
