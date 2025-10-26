const passport = require("passport");
const prisma = require("../db/prisma.js");

function isLoggedIn(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    req.user = user;
    next();
  })(req, res, next);
}

async function isParticipant(req, res, next) {
  const conversationId = parseInt(req.params.id);

  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    if (
      conversation.userAId !== req.user.id &&
      conversation.userBId !== req.user.id
    ) {
      return res.status(403).json({ error: "Not authorized" });
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { isLoggedIn, isParticipant };
