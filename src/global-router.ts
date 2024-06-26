import { Router } from "express";
import userRouter from "./user/user-router";
import problemRouter from "./problems/problem-router";
// other routers can be imported here

const globalRouter = Router();

// Use the userRouter for user-related routes
globalRouter.use(userRouter);
globalRouter.use(problemRouter);

// other routers can be added here

export default globalRouter;
