const express = require("express");
const authRouter = require("./auth.js");
const userRouter = require("./user.js");
const messageRouter = require("./message.js");

const router = express.Router();

router.use("/auth", authRouter);

router.use("/users", userRouter);

router.use("/messages", messageRouter);

module.exports = router;