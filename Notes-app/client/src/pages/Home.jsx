import React from 'react';
import FilterBar from '../components/FilterBar';
import AddNoteForm from '../components/AddNoteForm';

const Home = () => {

  return (
    <div className="home-container">

      <AddNoteForm onNoteAdded={(newNote) => {
  // to push to notes list or refetch notes later
}} />
      <FilterBar />
    </div>
  );
};

export default Home;
