const express = require("express");
const { isLoggedIn, isParticipant } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(isLoggedIn);

// returns (and creates if not already created) the conversation 
// (perhaps just conversation id) of the conversation between the user and the otherUser
router.get("/with/:otherUserId", async (req, res, next) => {
  res.status(501);
});

// posts a new message in the conversation with CONVERSATION ID == :id
router.post("/:id/messages", isParticipant, async (req, res, next) => {
  res.status(501);
});



module.exports = router;