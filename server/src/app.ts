import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
    
app
    .use(cors({
        origin: '*',
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }))
    .use(express.json())
    .use(routes);

export default app;