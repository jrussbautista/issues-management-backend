import { Request, Response } from 'express';
import { prisma } from '../lib/prisma-client';

export const getIssues = async (req: Request, res: Response) => {
  const issues = await prisma.issue.findMany();
  return res.status(200).json(issues);
};
