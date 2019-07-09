import passport from "../config/passport";
import { User } from "../db/schema";
import { errorHandler } from "../db/errors";
import rasha from "rasha";
import * as jwtConfig from "../config/jwt";

/**
 * Sends the JWT key set
 */
export const getJwks = async (ctx, next) => {
  const jwk = {
    ...rasha.importSync({ pem: jwtConfig.publicKey }),
    alg: "RS256",
    use: "sig",
    kid: jwtConfig.publicKey
  };
  const jwks = {
    keys: [jwk]
  };
  ctx.set("Content-Type", "application/json");
  ctx.response.body = JSON.stringify(jwks, null, 2) + "\n";
};

/**
 * Sign in using username and password and returns JWT
 */
export const postLogin = async (ctx, next) => {
  // TODO add errors
  passport.authenticate("local", (err, user, info) => {
    if (user) {
      ctx.set("Content-Type", "application/json");
      ctx.response.body = user.getUser();
    }
  })(ctx, next);
};

/**
 * POST /signup
 * Create a new local account
 */
export const postSignup = async (ctx, next) => {
  try {
    const user = await User.query()
      .allowInsert("[username, password]")
      .insert({
        username: ctx.request.body.username,
        password: ctx.request.body.password
      })
      .then(result => {
        passport.authenticate("local", (err, user, info) => {
          console.log("user");
          if (err) {
            console.log(err);
            ctx.throw(400, { error: err });
            return;
          }
          if (user) {
            console.log(user);
            ctx.body = user.getUser();
            return ctx.body;
          }
        })(ctx, next);
      });
  } catch (err) {
    console.log(err);
    ctx.throw(400, { error: err });
    return;
  }
};
