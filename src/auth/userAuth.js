import jsonwebtoken from "jsonwebtoken";
import { User } from "../models/User.js";
import { errorResponse } from "../responses/response.js";
const { verify } = jsonwebtoken;

export const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return errorResponse(res, "No Authorization found in header", 401);
    const token = authorization?.split(" ")[1];
    verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) throw new Error(err.message);
      const user = await User.findById(decode?._id);
      if (!user?.token && !user?.isLoggedIn)
        return errorResponse(res, "Invalid token, Please LogIn Again", 401);
      req.user = decode;
      return next();
    });
  } catch (error) {
    return errorResponse(res, error.message, 401);
  }
};

export const isAuthorized = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const user = await User.findById(_id);
    if (user && user?.isAdmin) {
      return next();
    }
    if (user && user?._id.toHexString() === id) {
      return next();
    }
    return errorResponse(res, "Unauthorized access", 401);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
