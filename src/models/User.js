import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    token: {
      type: String,
    },
    last_login: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
