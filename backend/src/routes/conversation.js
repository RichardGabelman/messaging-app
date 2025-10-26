const express = require("express");
const { isLoggedIn, isParticipant } = require("../middlewares/authMiddleware");
const prisma = require("../db/prisma");

const router = express.Router();

router.use(isLoggedIn);

// returns (and creates if not already created) the conversation
// (perhaps just conversation id) of the conversation between the user and the otherUser
router.get("/with/:otherUserId", async (req, res, next) => {
  const otherUserId = parseInt(req.params.otherUserId);

  if (req.user.id === otherUserId) {
    return res
      .status(400)
      .json({ error: "Cannot create conversations with yourself" });
  }
  // want the smallest id to be AId
  const [userAId, userBId] = [req.user.id, otherUserId].sort((a, b) => a - b);

  try {
    const otherUser = await prisma.user.findUnique({
      where: { id: otherUserId },
      select: { id: true, username: true },
    });

    if (!otherUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const conversation = await prisma.conversation.upsert({
      where: { userAId_userBId: { userAId, userBId } },
      create: { userAId, userBId },
      update: {},
      include: {
        messages: {
          include: { author: { select: { id: true, username: true } } },
          orderBy: { timestamp: "asc" },
        },
        userA: { select: { id: true, username: true } },
        userB: { select: { id: true, username: true } },
      },
    });

    res.status(200).json(conversation);
  } catch (err) {
    next(err);
  }
});

// posts a new message in the conversation with CONVERSATION ID == :id
router.post("/:id/messages", isParticipant, async (req, res, next) => {
  const conversationId = parseInt(req.params.id);
  const { content } = req.body;

  try {
    const message = await prisma.message.create({
      data: {
        content,
        conversationId,
        authorId: req.user.id
      },
      include: {
        author: { select: { id: true, username: true } }
      }
    });

    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
