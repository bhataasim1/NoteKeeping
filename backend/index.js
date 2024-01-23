import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './database/Connect.js';
import TodoRoutes from './routes/Notes.routes.js';

const PORT = 8000 || process.env.PORT;

const app = express();
connectDB();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use('/api', TodoRoutes);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));