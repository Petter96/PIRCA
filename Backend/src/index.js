import express from 'express';
import { PORT, FRONTEND_URL } from './config.js';
import userRoutes from './routes/users.routes.js'
import morgan from 'morgan';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(userRoutes);

app.listen(PORT);
console.log("Server on port ", PORT);