import { prisma } from '../../../src/lib/prisma-client';
import { hashedPassword } from '../../../src/utils/auth';
import { generateFakeUser } from '../fixtures/user';

export const fakeUser1 = generateFakeUser({ email: 'fakeEmail1@test.com' });
export const fakeUser2 = generateFakeUser({ email: 'fakeEmail2@test.com' });

const fakeUsers = [fakeUser1, fakeUser2];

export const setup = async () => {
  await prisma.user.deleteMany();

  fakeUsers.forEach(async (fakeUser) => {
    const data = { ...fakeUser, password: hashedPassword(fakeUser.password) };
    await prisma.user.create({ data });
  });
};
