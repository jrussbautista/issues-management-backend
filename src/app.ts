import express from 'express';
import issuesRoute from './routes/issues.route';

const app = express();

// Routes
app.use('/issues', issuesRoute);

export default app;
