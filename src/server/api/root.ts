import { exampleRouter } from "./routers/example";
import { todoRouter } from "./routers/todo";
import { createTRPCRouter } from "y/server/api/trpc";

export const appRouter = createTRPCRouter({
  todo: todoRouter,
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
