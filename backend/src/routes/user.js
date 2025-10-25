const express = require("express");
const { listUsers } = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(isLoggedIn);

router.get("/", listUsers);

module.exports = router;