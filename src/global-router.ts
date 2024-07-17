import { Router } from "express";
import problemRouter from "./problems/problem-router";
import authRouter from "./auth/auth-router";

const globalRouter = Router();

globalRouter.use(authRouter);
globalRouter.use(problemRouter);

export default globalRouter;
