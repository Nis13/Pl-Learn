import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import * as UserService from "./repository/user.repo";
import config from "./config";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await UserService.getById(payload.id);
      if (user) return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

export default passport;
