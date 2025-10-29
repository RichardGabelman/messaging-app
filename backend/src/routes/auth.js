const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const prisma = require("../db/prisma.js");
const registerValidator = require("../validators/authValidator.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Login failed" });

    const payload = {
      sub: user.id,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) return next(err);
        res.status(200).json({
          token,
          userId: user.id,
          username: user.username,
        });
      }
    );
  })(req, res, next);
});

router.post("/register", registerValidator, async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const payload = {
      sub: user.id,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) return next(err);
        res.status(201).json({
          token,
          userId: user.id,
          username: user.username,
        });
      }
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;
