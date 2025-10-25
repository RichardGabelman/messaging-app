const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const prisma = require("../db/prisma.js");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
        select: {
          id: true,
          username: true,
          password: true,
          roles: {
            select: {
              role: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      const { password, ...safeUser } = user;
      return done(null, safeUser);
    } catch (err) {
      return done(err);
    }
  })
);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: jwt_payload.sub,
        },
        select: {
          id: true,
          username: true,
          roles: {
            select: {
              role: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;