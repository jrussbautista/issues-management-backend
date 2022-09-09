import type { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from '../config';
import { exclude } from '../utils/exclude';

export const sendResponseToken = ({
  user,
  res,
  statusCode,
}: {
  user: User;
  statusCode: number;
  res: Response;
}) => {
  const payload = {
    userId: user.id,
  };

  const token = jwt.sign(payload, `${JWT_SECRET_KEY}`, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const userWithoutPassword = exclude(user, 'password');

  res.status(statusCode).json({ user: userWithoutPassword, token });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    return sendResponseToken({ user, res, statusCode: 200 });
  })(req, res, next);
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('signup', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    return sendResponseToken({ user, res, statusCode: 201 });
  })(req, res, next);
};

export const getMe = async (req: Request, res: Response) => {
  res.status(200).json({ data: { user: req.user } });
};
