import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
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
    .use((req, res, next) => {
        if (
            req.method === 'GET' && req.url === '/animals' 
            || req.method === 'POST' && req.url === '/volunteers/forms'
            || req.method === 'POST' && req.url === '/sponsorships/forms'
            || req.method === 'POST' && req.url === '/adoptions/forms'
            || req.method === 'GET' && req.url === '/admins/login'
        )
            return next();

        const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
        if (!token)
            return res.status(401).json({ message: 'Missing authorization header' });

        try {
            jwt.verify(token.replace(/['"]/g, ''), String(process.env.JWT_SECRET));

            return next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    })
    .use(routes);

export default app;