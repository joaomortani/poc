import Router from "@koa/router";
import { general } from "./controller";
import { post } from "./controller";
const unprotectedRouter = new Router();

// Hello World route
unprotectedRouter.get("/", general.helloWorld);
unprotectedRouter.post("/post", post.createPost);
export { unprotectedRouter };