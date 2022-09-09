import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { JWT_SECRET_KEY } from '../config';
import { prisma } from './prisma-client';
import { hashedPassword, matchesPassword } from '../utils/auth';
import { roles } from '../constants';

//  This verifies that the token sent by the user is valid
passport.use(
  new JWTStrategy(
    {
      secretOrKey: JWT_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const { userId } = token;
        const user = await prisma.user.findFirst({ where: { id: userId } });
        if (!user) return done(null, false, 'User not found');
        //  Pass the user details to the next middleware
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const { firstName, lastName } = req.body;

        let user = await prisma.user.findFirst({
          where: {
            email: email.toLowerCase(),
          },
        });

        if (user) {
          return done(null, false, { message: 'Email is already taken' });
        }

        user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword(password),
            firstName,
            lastName,
            role: roles.user,
            isActive: true,
          },
        });
        //  Send the user information to the next middleware
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findFirst({
          where: {
            email: email.toLowerCase(),
          },
        });

        if (!user) {
          return done(null, false, {
            message: 'Email or Password is incorrect',
          });
        }

        const isPasswordMatch = matchesPassword(password, user.password);

        if (!isPasswordMatch) {
          return done(null, false, {
            message: 'Email or password is incorrect',
          });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);
