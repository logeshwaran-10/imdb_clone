const mongoose = require("mongoose");
const { Schema } = mongoose;

const actorSchema = new Schema(
  {
    name: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    bio: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const actor = mongoose.model("actor", actorSchema);

module.exports = actor;
