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
