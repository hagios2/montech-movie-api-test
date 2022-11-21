import { User } from "../../models/User.js";
import { compareHash } from "../../utils/hashPassword.js";
import { signToken } from "../../utils/signToken.js";

export const logInUser = async (credentials) => {
  const { email, password } = credentials
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error("User not found")
  }
  await compareHash(user?.password, password)
  const token = signToken(user.toJSON())
  await User.findByIdAndUpdate(
    user?._id,
    {
      token,
      last_login: new Date().toISOString(),
    },
    { new: true }
  );
  return {user, token};
}

export const logOutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { isLoggedIn: false, token: "" });
};

