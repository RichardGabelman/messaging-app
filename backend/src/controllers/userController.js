const prisma = require("../db/prisma");

async function listUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });

    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

module.exports = { listUsers };