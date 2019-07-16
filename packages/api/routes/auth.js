import Router from "koa-router";
import pino from "pino";
import rasha from "rasha";

import errorHandler from "../db/errors";
import passport from "../config/passport";
import { User } from "../db/schema";
import * as jwtConfig from "../config/jwt";

const logger = pino();
const router = new Router();

/**
 * Sends the JWT key set
 */
router.get("/jwk", async ctx => {
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
  ctx.response.body = `${JSON.stringify(jwks, null, 2)}`;
});

const authenticate = (ctx, user, err, status, info) => {
  if (!user) {
    logger.error(err, status, info);
    ctx.status = 401;
    ctx.body = {
      error: err
    };
  } else {
    ctx.body = { success: true, user: user.getUser() };
    return ctx.login(user);
  }
  return undefined;
};

/**
 * POST /login
 * Sign in using username and password and returns JWT
 */
router.post("/login", async ctx => {
  return passport.authenticate("local", (err, user, info, status) => {
    authenticate(ctx, user, err, status, info);
  })(ctx);
});

/**
 * POST /signup
 * Create a new local account
 */
router.post("/signup", async ctx => {
  try {
    const newUser = await User.query()
      .allowInsert("[username, password]")
      .insert({
        username: ctx.request.body.username,
        password: ctx.request.body.password
      });
    if (newUser) {
      return passport.authenticate("local", (err, user, info, status) => {
        authenticate(ctx, user, err, status, info);
      })(ctx);
    }
  } catch (err) {
    errorHandler(err, ctx);
    ctx.status = 400;
    ctx.body = {
      error: err
    };
  }
  return undefined;
});

export default router;
