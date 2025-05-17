const mongoose = require("mongoose");
const { Schema } = mongoose;

const MovieSchema = new Schema(
  {
    movie_name: { type: String, required: true },
    year_of_release: { type: String, required: true },
    actors: { type: [String], required: true },
    producer: { type: String, required: true },
    plot: { type: String, required: true },
    poster: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const movie = mongoose.model("movie", MovieSchema);

module.exports = movie;
