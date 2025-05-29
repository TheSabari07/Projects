import React from 'react';
import UrlInputForm from '../components/UrlInputForm';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">VidFetch</h1>
      <p className="text-gray-600 mb-6 text-center">
        Download videos from social media using the URL
      </p>
      <UrlInputForm />
    </div>
  );
};

export default Home;
