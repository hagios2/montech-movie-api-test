import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;

export const signToken = (data) => {
  const token = sign(data, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
