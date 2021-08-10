import express from "express";
const authRouter = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.jwtSecret;
import auth from "../middleware/auth.js";
import User from "../models/user.model.js";

// @route POST /auth
// @desc Login / authenticate user
// @access Public
authRouter.post("/", (request, response) => {
  const body = request.body;
  console.log(body);
  console.log("asd");

  // Simple validation on both email and password
  if (!body.email || !body.password) {
    return response.status(400).json({ msg: "Please fill all fields" });
  }

  // Check if user exists
  const user = User.findOne({ email: body.email }).then((user) => {
    if (!user) return response.status(400).json({ msg: "User does not exist" });
    // Validate password
    bcrypt.compare(body.password, user.password).then((isMatch) => {
      if (!isMatch)
        return response.status(400).json({ msg: "Invalid credentials" });

      const userForToken = {
        email: user.email,
        id: user._id,
      };

      const token = jwt.sign(userForToken, jwtSecret);

      response.status(200).send({ token, email: user.email });
    });
  });
});

// @route GET /auth/user
// @desc Get user data
// @access Private
authRouter.get("/user", auth, (request, response) => {
  User.findById(request.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

export default authRouter;
