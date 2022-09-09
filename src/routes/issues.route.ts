import express from 'express';
import * as issuesController from '../controllers/issues.controller';

const issuesRouter = express.Router();

issuesRouter.route('/').get(issuesController.getIssues);

export default issuesRouter;
