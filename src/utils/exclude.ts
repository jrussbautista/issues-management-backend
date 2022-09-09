export function exclude<User, Key extends keyof User>(
  user: User,
  ...keys: Key[]
): Omit<User, Key> {
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    // eslint-disable-next-line no-param-reassign
    delete user[key];
  }
  return user;
}
