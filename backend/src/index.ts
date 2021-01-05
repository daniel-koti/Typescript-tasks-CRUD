import 'reflect-metadata';

import express from 'express';
import cors from 'cors';

import { createConnection } from 'typeorm';

import routes from './routes';

const app = express();

createConnection();

app.use(cors());
app.use(express.json());
app.use(routes);



app.listen(3333, () => console.log('🚀 Server is running on port 3333'))