import { Elysia } from "elysia";
import { testApi } from "./modules/test-api";
import { serverAdapter } from "./bullmq";
import { openapi } from '@elysiajs/openapi';
import cors from '@elysiajs/cors';

async function bootstrap() {
  const app = new Elysia();

  const bullBoardPlugin = await serverAdapter.registerPlugin();

  app
    .use(cors())
    .use(bullBoardPlugin)
    .use(testApi)
    .use(openapi());

  app.listen(80);

  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
}

bootstrap();

