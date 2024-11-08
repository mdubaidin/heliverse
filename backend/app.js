import './config/index.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import usersRouter from './routes/users.js';
import teamRouter from './routes/team.js';

const app = new express();

app.use(express.json());

app.use(morgan('dev'));

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'],
        credentials: true,
    })
);

app.use('/api/users', usersRouter);
app.use('/api/team', teamRouter);

app.use(errorHandler);

export default app;
