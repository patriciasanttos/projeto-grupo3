import express from 'express';
import cors from 'cors';
import routes from './routes';
require('dotenv').config();

const app = express();

app
    .use(cors({
        origin: process.env.CORS_ORIGIN_URL,
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }))
    .use(express.json())
    .use(routes);

export default app;