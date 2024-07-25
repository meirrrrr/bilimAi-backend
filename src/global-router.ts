import { Router } from "express";
import problemRouter from "./problems/problem-router";
import authRouter from "./auth/auth-router";
import testRouter from "./test/test-router";
import userRouter from "./user/user-router";

const globalRouter = Router();

globalRouter.use(authRouter);
globalRouter.use(problemRouter);
globalRouter.use(testRouter)
globalRouter.use(userRouter)

export default globalRouter;
