import mongoose from "mongoose";

const { Schema, model } = mongoose;

const listSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    user: {
      required: true,
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    movies: [
      {
        required: false,
        ref: "Movie",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

export const List = model("List", listSchema);
