import Elysia from "elysia";
import { exampleBullMq } from "../../bullmq";

export const testApi = new Elysia({ prefix: 'api' })
    .get('test', async ({ query }) => {
        exampleBullMq.add('BullMQ', { title: query.title });
    })