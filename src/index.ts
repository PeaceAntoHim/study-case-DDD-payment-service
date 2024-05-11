import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { endpointsUser } from "./dependency-injection/dependency-injection";
const app = new Elysia();

app
  .use(swagger())
  .trace(async ({ beforeHandle }) => {
    const { children } = await beforeHandle;

    for (const child of children) {
      const { time: start, end, name } = await child;

      console.info(name, "took", (await end) - start, "ms");
    }
  })
  .onResponse(() => {
    console.info("Response", performance.now());
  })
  .onError(({ code, error }) => {
    return new Response(error.toString());
  })
  .group("/api", (app) => app.use(endpointsUser))
  .listen(process.env.PORT ?? 3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
