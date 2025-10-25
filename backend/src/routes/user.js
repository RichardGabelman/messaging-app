const express = require("express");
const { isLoggedIn } = require("../middlewares/authMiddleware");
const { listUsers } = require("../controllers/userController");

const router = express.Router();

router.get("/", isLoggedIn, listUsers);

module.exports = router;