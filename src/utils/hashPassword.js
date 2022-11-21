import bcryptjs from "bcryptjs";
const { hash, compare: _compare } = bcryptjs;

export const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 10);
  if (!hashPassword) throw new Error("Password cannot hashed");
  return hashedPassword;
};

export const compareHash = async (hashedPassword, rawPassword) => {
  const compare = await _compare(rawPassword, hashedPassword);
  if (!compare) throw new Error("Invalid credentials");
  return compare;
};
