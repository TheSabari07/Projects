import express from 'express';
import Note from '../models/Note.js';

const router = express.Router();

// Get all notes
router.get('/', async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

// Add note
router.post('/', async (req, res) => {
  const newNote = new Note(req.body);
  const saved = await newNote.save();
  res.json(saved);
});

// Delete note
router.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Update note (pin/edit)
router.put('/:id', async (req, res) => {
  const updated = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

export default router;
