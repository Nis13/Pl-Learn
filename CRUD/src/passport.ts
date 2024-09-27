import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import config from "./config";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    return done(null, payload);
  })
);

export default passport;
