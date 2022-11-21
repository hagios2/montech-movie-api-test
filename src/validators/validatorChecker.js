import { validationResult } from "express-validator";
import { errorResponse } from "../responses/response.js";

export const ValidationChecker = (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) return errorResponse(res, error.array(), 400);
    return next();
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};
