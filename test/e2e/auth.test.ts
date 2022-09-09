import request from 'supertest';
import app from '../../src/app';
import { exclude } from '../../src/utils/exclude';
import { setup, fakeUser1 } from './setup';

beforeAll(() => {
  return setup();
});

describe('Sign Up', () => {
  test('should register user', async () => {
    const data = {
      firstName: 'Test',
      lastName: 'User',
      password: 'password',
      email: 'test@gmail.com',
    };

    const response = await request(app).post('/auth/signup').send(data);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({ user: exclude(data, 'password') });
    expect(response.body).toHaveProperty('token');
  });

  test('should not register user if email is already taken', async () => {
    const { firstName, lastName, email, password } = fakeUser1;
    const data = {
      firstName,
      lastName,
      password,
      email,
    };

    const response = await request(app).post('/auth/signup').send(data);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Email is already taken');
  });
});

describe('Sign In', () => {
  test('should login existing user', async () => {
    const { email, password } = fakeUser1;
    const data = {
      email,
      password,
    };

    const response = await request(app).post('/auth/login').send(data);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      user: exclude(fakeUser1, 'password'),
    });
    expect(response.body).toHaveProperty('token');
  });

  test('should not login non-existing user', async () => {
    const data = {
      email: 'nonexistentemail@test.com',
      password: 'password',
    };

    const response = await request(app).post('/auth/login').send(data);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Email or Password is incorrect');
  });
});
