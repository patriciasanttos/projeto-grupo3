import express from 'express';

const app = express()
    .use(express.json());

export default app;