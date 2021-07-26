const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.jwtSecret;
const auth = require("../middleware/auth");

// User model
let User = require("../models/user.model");

// @route POST /auth
// @desc Login / authenticate user
// @access Public

router.post("/", (request, response) => {
  const body = request.body;
  //const { email, password } = request.body;

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

      /*       jwt.sign(
        { id: user.id },
        jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          response.json({
            token,
            user: {
              id: user.id,
              email: user.email,
            },
          });
        }
      ); */
    });
  });
});

// @route GET /auth/user
// @desc Get user data
// @access Private

router.get("/user", auth, (request, response) => {
  User.findById(request.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
