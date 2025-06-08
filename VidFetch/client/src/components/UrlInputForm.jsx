import React, { useState } from 'react';

const UrlInputForm = () => {
  const [url, setUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return alert('Please enter a URL.');

    setLoading(true);
    setVideoData(null);

    try {
      const res = await fetch('http://localhost:5006/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setVideoData(data);
    } catch (err) {
      console.error('Error:', err.message);
      alert(err.message);
    } finally {
      setLoading(false);
      setUrl('');
    }
  };

  return (
    <div className="w-full">
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
          {loading ? 'Fetching...' : 'Download'}
        </button>
      </form>

      {videoData && (
        <div className="mt-8 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm">
          <h2 className="text-xl font-semibold mb-2">{videoData.title}</h2>
          {videoData.thumbnail && (
            <img
              src={videoData.thumbnail}
              alt="Thumbnail"
              className="w-full sm:w-64 rounded mb-4"
            />
          )}
          <p className="mb-2">Duration: {videoData.lengthSeconds} seconds</p>
          <div className="space-y-2">
            {videoData.formats.map((format, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{format.quality}</span>
                <a
                  href={format.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlInputForm;
