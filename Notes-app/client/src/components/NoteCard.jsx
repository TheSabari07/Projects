import React from 'react';
import './NoteCard.css';

const NoteCard = ({ note, onDelete, onPinToggle }) => {
  const { _id, title, content, tag, pinned, createdAt } = note;

  return (
    <div className={`note-card ${pinned ? 'pinned' : ''}`}>
      <h3>{title}</h3>
      <p>{content}</p>
      <div className="note-meta">
        <span className="tag">{tag}</span>
        <span className="date">{new Date(createdAt).toLocaleString()}</span>
      </div>
      <div className="note-actions">
        <button onClick={() => onPinToggle(_id)}>
          {pinned ? 'Unpin' : 'Pin'}
        </button>
        <button className="delete" onClick={() => onDelete(_id)}>Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
