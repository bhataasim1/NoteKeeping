import express from 'express';
import { createTodo, getTodoById, deleteTodo, updateTodo, getTodos } from "../controllers/Notes.controller.js";

const router = express.Router();

router.get('/notes', getTodos);

router.post('/notes/create', createTodo);

router.get('/notes/:id', getTodoById);

router.put('/notes/:id', updateTodo);

router.delete('/notes/:id', deleteTodo);

export default router;