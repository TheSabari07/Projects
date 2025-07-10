import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';

const Home = () => {
  const [notes, setNotes] = useState([]);

  return (
    <div className="home-container">
      
      <FilterBar />
      
    </div>
  );
};

export default Home;
