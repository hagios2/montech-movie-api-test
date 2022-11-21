import mongoose from "mongoose";

const { Schema, model } = mongoose;

const movieSchema = new Schema(
  {
    original_title: {
      required: true,
      type: String,
    },
    user: {
      required: true,
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    original_language: {
      type: String,
    },
    overview: {
      type: String,
    },
    title: {
      type: String,
    },
    popularity: {
      type: Number,
    },
    release_date: {
      type: String,
    },
    vote_average: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Movie = model("Movie", movieSchema);
