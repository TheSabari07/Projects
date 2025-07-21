import React, { useState } from 'react';
import API from '../api'; 

const AddNoteForm = ({ onNoteAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const res = await API.post('/notes', {
        title,
        content,
        tag,
      });

      setTitle('');
      setContent('');
      setTag('');

      onNoteAdded && onNoteAdded(res.data);
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  return (
    <form className="add-note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <input
        type="text"
        placeholder="Tag (e.g. Work, Personal)"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNoteForm;
