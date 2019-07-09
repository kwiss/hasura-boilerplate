import passport from "koa-passport";
import LocalStrategy from "passport-local";
import BearerStrategy from "passport-http-bearer";
import { User } from "../db/schema";

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    function(username, password, done) {
      User.query()
        .where("username", username)
        .first()
        .eager("roles")
        .then(function(user) {
          if (!user) {
            return done("Unknown user");
          }
          if (!user.active) {
            return done("User is inactive");
          }
          user.verifyPassword(password, function(err, passwordCorrect) {
            if (err) {
              return done(err);
            }
            if (!passwordCorrect) {
              return done("Invalid password");
            }
            return done(null, user);
          });
        })
        .catch(function(err) {
          done(err);
        });
    }
  )
);

export default passport;
