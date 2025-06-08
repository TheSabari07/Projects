import React from 'react';
import UrlInputForm from '../components/UrlInputForm';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 transition-all">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          VidFetch
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-8">
          Download videos from social media using the URL
        </p>
        <UrlInputForm />
      </div>
    </div>
  );
};

export default Home;
