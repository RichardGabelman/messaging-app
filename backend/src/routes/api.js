const express = require("express");
const authRouter = require("./auth.js");
const userRouter = require("./user.js");
const conversationRouter = require("./conversation.js");

const router = express.Router();

router.use("/auth", authRouter);

router.use("/users", userRouter);

router.use("/conversation/:otherUserId", conversationRouter);

module.exports = router;