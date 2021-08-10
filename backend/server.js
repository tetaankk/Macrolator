import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
//import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//app.use(cors);
//app.options("*", cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/* app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers"
    //"Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}); */

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

import foodsRouter from "./routes/foods.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import fetchRouter from "./routes/fetch.js";

app.use("/foods", foodsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/fetch", fetchRouter);

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
