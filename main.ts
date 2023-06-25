import {
  Application,
  Context,
  Router,
} from "https://deno.land/x/oak@v12.5.0/mod.ts";
import { data } from "./data.ts";

const app = new Application();
const router = new Router();

router.get("/api/posts", (ctx: Context) => {
  ctx.response.status = 200;
  ctx.response.body = data;
});

app.use(router.allowedMethods());
app.use(router.routes());

await app.listen({ port: 8080 });
