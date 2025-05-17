const express = require("express");
const mongoose = require("mongoose");
const Movie = require("./models/movie.model");
const Actor = require("./models/actor.model");
const Producer = require("./models/producer.model");
const User = require("./models/actor.user");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());
const port = 8000;

const uri =
  "mongodb+srv://logeshwarancareer:WjCFnbDr1T7XH01w@backenddb.crosvnc.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(uri);
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}.`);
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/users", async (req, res) => {
  try {
    const movie = await User.find();
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
});

app.get("/movie", async (req, res) => {
  try {
    const movie = await Movie.find();
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
});

app.get("/actors", async (req, res) => {
  try {
    const actors = await Actor.find();
    res.status(200).json(actors);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
});
app.get("/producers", async (req, res) => {
  try {
    const producers = await Producer.find();
    res.status(200).json(producers);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
});

app.post("/movie", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(200).send({ data: movie, message: "Movie Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
});

app.put("/movie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Movie ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Movie ID" });
    }

    const updatedMovie = await Movie.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      data: updatedMovie,
      message: "Movie updated successfully",
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/add/:type", async (req, res) => {
  try {
    const { type } = req?.params;
    if (type) {
      const collection = {
        actor: Actor,
        producer: Producer,
      };
      const newChar = await collection[type].create(req.body);
      res
        .status(200)
        .send({ data: newChar, message: `${type} Added Successfully` });
    }
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
});