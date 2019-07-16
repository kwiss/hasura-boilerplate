import passport from "koa-passport";
import LocalStrategy from "passport-local";
import { User } from "../db/schema";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return User.query()
    .where({ id })
    .first()
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    (username, password, done) => {
      User.query()
        .where("username", username)
        .first()
        .eager("roles")
        .then(user => {
          if (!user) {
            return done("Unknown user");
          }
          if (!user.active) {
            return done("User is inactive");
          }
          user.verifyPassword(password, (err, passwordCorrect) => {
            if (err) {
              return done(err);
            }
            if (!passwordCorrect) {
              return done("Invalid password");
            }
            return done(null, user);
          });
          return done(null, false);
        })
        .catch(err => {
          done(err);
        });
    }
  )
);

export default passport;
