import React from 'react';
import UrlInputForm from '../components/UrlInputForm';

const Home = () => {

  return (

    <div className="app-container">
      <h1>VidFetch</h1>
      <p>Download videos from social media using the URL</p>
      <UrlInputForm />
    </div>
    
  );
};

export default Home;
