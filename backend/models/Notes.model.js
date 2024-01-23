import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    tagline: {
        type: String,
        trim: true,
        minlength: 3
    },
    body: {
        type: String,
        required: true,

    },
    isPinned: {
        type: Boolean,
        default: false
    },
},{timestamps: true});

export const Note = mongoose.model('Note', notesSchema);