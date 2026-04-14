
import { Queue, Worker } from "bullmq";
import { redisConfig } from "./redis-config";
import { sleep } from "bun";
import { ElysiaAdapter } from "@bull-board/elysia";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

const createQueueMQ = (name: string) => new Queue(name, { connection: redisConfig });

function setupBullMQProcessor(queueName: string) {
  new Worker(
    queueName,
    async (job) => {
      for (let i = 0; i <= 100; i++) {
        await sleep(Math.random());
        await job.updateProgress(i);
        await job.log(`Processing job at interval ${i}`);

        if (Math.random() * 200 < 1) throw new Error(`Random error ${i}`);
      }

      return { jobId: `This is the return value of job (${job.id})` };
    },
    { connection: redisConfig },
  );
}

export const exampleBullMq = createQueueMQ('BullMQ');

setupBullMQProcessor(exampleBullMq.name);

export const serverAdapter = new ElysiaAdapter('/ui');

createBullBoard({
  queues: [new BullMQAdapter(exampleBullMq)],
  serverAdapter,
  options: {
    // This configuration fixes a build error on Bun caused by eval (https://github.com/oven-sh/bun/issues/5809#issuecomment-2065310008)
    uiBasePath: 'node_modules/@bull-board/ui',
  },
});
