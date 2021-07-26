const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const foodsRouter = require("./routes/foods");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

app.use("/foods", foodsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/../build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running...?");
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
