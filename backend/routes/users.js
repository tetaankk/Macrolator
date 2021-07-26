const router = require("express").Router();
const bcrypt = require("bcryptjs");
let User = require("../models/user.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.jwtSecret;

router.get("/", (request, response) => {
  User.find()
    .then((users) => response.json(users))
    .catch((err) => response.status(400).json("Error " + err));
});

router.post("/add", (request, response) => {
  const { email, password } = request.body;

  // Simple validation on both email and password
  if (!email || !password) {
    return response.status(400).json({ msg: "Please fill all fields" });
  }

  // Check if user exists already
  User.findOne({ email }).then((email) => {
    if (email) {
      return response
        .status(400)
        .json({ msg: "A user with this email already exists" });
    }
  });

  const newUser = new User({
    email: request.body.email,
    password: request.body.password,
  });

  // Create salt & hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) =>
        jwt.sign(
          { id: user.id },
          jwtSecret,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            response.json({
              token,
              user: { id: user.id },
            });
          }
        )
      );
    });
  });
});

module.exports = router;
