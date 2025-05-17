const mongoose = require("mongoose");
const { Schema } = mongoose;

const producerSchema = new Schema(
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

const producer = mongoose.model("producer", producerSchema);

module.exports = producer;
