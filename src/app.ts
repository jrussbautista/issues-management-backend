import express from 'express';
import passport from 'passport';
// necessary to import before all routes to load env correctly
import './lib/dot-env';
import './lib/passport';
import issuesRouter from './routes/issues.route';
import authRouter from './routes/auth.route';

const app = express();
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/issues', issuesRouter);
app.use('/auth', authRouter);

export default app;
