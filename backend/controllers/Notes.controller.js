import { Note } from "../models/Notes.model.js";

export const getTodos = async (req, res) => {
    try {
        const notes = await Note.find({});
        res.json(notes);
    } catch (error) {
        console.error('Error getting notes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getTodoById = async (req, res) => {
    const id = req.params.id;

    try {
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ error: 'Note not found.' });
        }

        res.json(note);
    } catch (error) {
        console.error('Error getting note by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const createTodo = async (req, res) => {
    const { title, tagline, body, isPinned } = req.body;

    if (!title || !body) {
        return res.status(400).json({ error: 'Title and body are required.' });
    }

    try {
        const newNote = new Note({
            title,
            tagline,
            body,
            isPinned: !!isPinned,
        });

        await newNote.save();

        res.json(newNote);
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateTodo = async (req, res) => {
    const id = req.params.id;
    const { title, tagline, body, isPinned } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            {
                title: title || '',
                tagline: tagline || '',
                body: body || '',
                isPinned: isPinned !== undefined ? !!isPinned : false,
                updatedAt: new Date(),
            },
            { new: true }
        );

        res.json(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const deleteTodo = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found.' });
        }

        res.json({status: "success"});
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
