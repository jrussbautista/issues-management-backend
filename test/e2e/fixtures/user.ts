import { faker } from '@faker-js/faker';

export const generateFakeUser = (overrides: Record<string, any> = {}) => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: 'password',
    isActive: true,
    role: 'user',
    ...overrides,
  };
};
