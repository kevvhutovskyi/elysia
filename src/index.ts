import { Elysia } from "elysia";
import { testApi } from "./modules/test-api";
import { serverAdapter } from "./bullmq";
import { openapi } from '@elysiajs/openapi';

const app = new Elysia();

app
  .use(serverAdapter.registerPlugin())
  .use(testApi)
  .use(openapi());

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
