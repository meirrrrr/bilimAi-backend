import { Router } from "express";
import problemRouter from "./problems/problem-router";
import authRouter from "./auth/auth-router";
import testRouter from "./test/test-router";

const globalRouter = Router();

globalRouter.use(authRouter);
globalRouter.use(problemRouter);
globalRouter.use(testRouter)

export default globalRouter;
