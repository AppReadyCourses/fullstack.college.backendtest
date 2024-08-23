const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();

app.use(cors());

const Topic = require("./models/topic.model");
const Tag = require("./models/tag.model");

app.use(express.json());

app.get("/api/topics", async (req, res) => {
  try {
    const topics = await Topic.find({});
    console.log("get topics", topics);
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/topic/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findById(id);
    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body.form, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Produdct not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/topic", async (req, res) => {
  try {
    console.log("topic", req.body);
    const topic = await Topic.create(req.body);
    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("API works");
});

app.post("/api/tag", async (req, res) => {
  try {
    console.log("tag", req.body);
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/api/tag", async (req, res) => {
  try {

    const tags = await Tag.find({});
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://appready:1qVCqaSkaa9NFECu@cluster0.5mcpm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
