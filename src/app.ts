import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import issuesRoute from './routes/issues.route';

const app = express();

console.log('env', process.env.DATABASE_URL);

// Routes
app.use('/issues', issuesRoute);

export default app;
