import React, { useEffect, useState } from 'react';
import API from '../api';
import AddNoteForm from '../components/AddNoteForm';
import FilterBar from '../components/FilterBar';
import NoteCard from '../components/NoteCard';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await API.get('/notes');
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  const handleAddNote = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleDeleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleTogglePin = async (id) => {
    try {
      const target = notes.find((n) => n._id === id);
      const updated = await API.put(`/notes/${id}`, {
        pinned: !target.pinned,
      });
      setNotes((prev) =>
        prev.map((n) => (n._id === id ? updated.data : n))
      );
    } catch (err) {
      console.error('Pin toggle error:', err);
    }
  };

  const filteredNotes = notes
    .filter((note) =>
      selectedTag ? note.tag.toLowerCase() === selectedTag.toLowerCase() : true
    )
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.pinned - a.pinned);

  return (
    <div className="home-container">
      <AddNoteForm onNoteAdded={handleAddNote} />
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />

      <div className="notes-list">
        {filteredNotes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onDelete={handleDeleteNote}
              onPinToggle={handleTogglePin}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
