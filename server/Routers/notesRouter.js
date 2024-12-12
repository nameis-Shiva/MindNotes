import express from 'express';
import { createNote, getNotes, getNote, updateNote, deleteNote } from '../controller/noteController.js';
import { verifyToken } from '../middlewares/jwt-Verification.js';

const notesRouter = express.Router();

// Create a new note
notesRouter.post('/create', verifyToken, createNote);

// Get all notes for the logged-in user
notesRouter.get('/', verifyToken, getNotes);

// Get a specific note by ID
notesRouter.get('/getnote/:id', verifyToken, getNote);

// Update a specific note by ID
notesRouter.put('/:id', verifyToken, updateNote);

// Delete a specific note by ID
notesRouter.delete('/:id', verifyToken, deleteNote);

export default notesRouter;
