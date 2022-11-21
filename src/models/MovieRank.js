import mongoose from "mongoose";

const { Schema, model } = mongoose;

const movieRankSchema = new Schema(
  {
    rank: {
      required: true,
      type: Number,
      unique: true,
    },
    user: {
      required: true,
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    movie: {
      required: false,
      ref: "Movie",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export const MovieRank = model("MovieRank", movieRankSchema);
