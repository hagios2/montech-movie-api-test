import { check } from "express-validator";

export const logInValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid email format"),
  check("password")
    .notEmpty()
    .withMessage("password must be provided")
    .isString()
    .withMessage("password must be of type string"),
];
