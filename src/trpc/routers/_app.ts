import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
export const appRouter = createTRPCRouter({
  hello: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
    getUser: protectedProcedure.query(({ ctx }) => {
      return prisma.account.findMany()
    }),
    getWorkFlows : protectedProcedure.query(()=>{
      return prisma.workflow.findMany()
    }),
    createWorkflow : protectedProcedure.mutation(async()=>{
      await inngest.send({
        name: "test/hello.world",
        data: {
          email: "",
        },
      });
      return {success:true}
     
    })
});
// export type definition of API
export type AppRouter = typeof appRouter;