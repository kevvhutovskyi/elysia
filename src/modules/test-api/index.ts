import Elysia, { t } from "elysia";
import { exampleBullMq } from "../../bullmq";

export const testApi = new Elysia({ prefix: 'api' })
    .get('test', async ({ query }) => {
        exampleBullMq.add('BullMQ', { title: query.title });
    }, { query: t.Object({
        title: t.String()
    }) })