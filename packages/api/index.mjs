import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import passport from "koa-passport";
import * as userController from "./controllers/user";

const PORT = process.env.PORT || 4000;

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(passport.initialize());
app.use(router.routes()).use(router.allowedMethods());

router
  .get("/jwks", userController.getJwks)
  .post("/login", userController.postLogin)
  .post("/signup", userController.postSignup);

// server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
