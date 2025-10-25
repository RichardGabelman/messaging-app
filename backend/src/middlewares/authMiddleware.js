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

module.exports = { isLoggedIn };