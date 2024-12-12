import Note from '../models/notesModel.js';

export const createNote = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const author = req.id;

        if (!title || !content) {
            return res.status(400).send({ error: 'Title and content are required.' });
        }

        const note = new Note({
            title,
            content,
            tags,
            author,
        });

        const savedNote = await note.save();
        return res.status(201).send({ message: 'Note created successfully', note: savedNote });
    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error', msg: error.message });
    }
};

export const getNotes = async (req, res) => {
    try {
        const author = req.id; 
        const notes = await Note.find({ author }).sort({ createdAt: -1 });
        return res.status(200).send(notes);
    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error', msg: error.message });
    }
};

export const getNote = async (req, res) => {
    try {
        const { id } = req.params;
        const author = req.id; 

        const note = await Note.findOne({ _id: id, author });
        if (!note) {
            return res.status(404).send({ error: 'Note not found' });
        }
        return res.status(200).send(note);
    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error', msg: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const author = req.id; 
        const { title, content, tags } = req.body;

        const note = await Note.findOneAndUpdate(
            { _id: id, author },
            { title, content, tags, updatedAt: Date.now() },
            { new: true }
        );

        if (!note) {
            return res.status(404).send({ error: 'Note not found or unauthorized' });
        }

        return res.status(200).send({ message: 'Note updated successfully', note });
    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error', msg: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const author = req.id; 

        const note = await Note.findOneAndDelete({ _id: id, author });
        if (!note) {
            return res.status(404).send({ error: 'Note not found or unauthorized' });
        }

        return res.status(200).send({ message: 'Note deleted successfully' });
    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error', msg: error.message });
    }
};
