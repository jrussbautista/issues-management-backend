import bcrypt from 'bcryptjs';

export const matchesPassword = (
  currentPassword: string,
  passwordToConfirm: string
) => {
  return bcrypt.compareSync(currentPassword, passwordToConfirm);
};

export const hashedPassword = (password: string) => {
  const salt = 10;
  return bcrypt.hashSync(password, salt);
};
