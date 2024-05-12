import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import routes from "./routes/routes";
import jwt from "@elysiajs/jwt";
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
  .use(
    jwt({
      name: "jwt",
      secret: "Fischl von Luftschloss Narfidosrt",
    })
  )
  .get("/sign/:name", async ({ jwt, cookie: { auth }, params }) => {
    auth.set({
      value: await jwt.sign(params),
      httpOnly: true,
      maxAge: 7 * 86400,
      path: "/profile",
    });

    return `Sign in as ${auth.value}`;
  })
  .get("/profile", async ({ jwt, set, cookie: { auth } }) => {
    const profile = await jwt.verify(auth.value);

    if (!profile) {
      set.status = 401;
      return "Unauthorized";
    }

    return `Hello ${profile.name}`;
  })
  .group("/api", (app) => app.use(routes.endpointsUser as any))
  .group("/api", (app) => app.use(routes.endpointPayment as any))
  .listen(process.env.PORT ?? 3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
