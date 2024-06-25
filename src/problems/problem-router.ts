import { Router } from "express";
import ProblemContoller from "./problem-controller";
import ProblemService from "./problem-service";

const problemRouter = Router();

const problemService = new ProblemService();
const problemController = new ProblemContoller(problemService);

problemRouter.get("/problems", problemController.getProblems);
problemRouter.post("/problems", problemController.createProblem);
problemRouter.get("/mathTest", problemController.generateTest);

export default problemRouter;
