import Koa from "koa";
import bodyParser from "koa-bodyparser";
import passport from "./config/passport";
import session from "koa-session";
import RedisStore from "koa-redis";

import authRoutes from "./routes/auth";

const store = new RedisStore();
const app = new Koa();
const PORT = process.env.PORT || 1337;

// sessions
app.keys = ["super-secret-key"];
app.use(session({ store }, app));

// body parser
app.use(bodyParser());

// authentication
app.use(passport.initialize());
// app.use(passport.session());

// routes
app.use(authRoutes.routes());

// server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
