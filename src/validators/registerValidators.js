import { check } from "express-validator";

export const registerValidator = [
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
  check("name")
    .notEmpty()
    .withMessage("Name must be provided")
    .isString()
    .withMessage("Name must be of type string"),
];
