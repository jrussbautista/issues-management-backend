import express from 'express';
import * as issuesController from '../controllers/issues.controller';

const issuesRoute = express.Router();

issuesRoute.route('/').get(issuesController.getIssues);

export default issuesRoute;
