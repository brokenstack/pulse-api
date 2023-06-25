import {
  Application,
  Context,
  Router,
} from "https://deno.land/x/oak@v12.5.0/mod.ts";
import { data } from "./data.ts";

const app = new Application();
const router = new Router();

router.get("/api/posts", (ctx: Context) => {
  let page = 0;
  let pageSize = data.length;

  ctx.request.url.searchParams.forEach((v, k) => {
    if (k == "page") {
      page = Number(v);
    }

    if (k == "pageSize") {
      pageSize = Number(v);
    }
  });

  ctx.response.status = 200;
  ctx.response.body = data.slice(pageSize * page, (pageSize * page) + pageSize);
});

app.use(router.allowedMethods());
app.use(router.routes());

await app.listen({ port: 8080 });
