import { error } from "console";
import { CreateProblemDto } from "./dtos/CreateProblem.dto";
import ProblemService from "./problem-service";
import e, { Request, Response } from "express";

class ProblemContoller {
  private problemService: ProblemService;

  constructor(problemService: ProblemService) {
    this.problemService = problemService;
  }

  getProblems = async (req: Request, res: Response): Promise<void> => {
    try {
      const problems = await this.problemService.getProblems();
      res.status(200).json(problems);
    } catch (error) {
      res.status(500).send({ error: error });
    }
  };

  createProblem = async (req: Request, res: Response): Promise<void> => {
    try {
      const createProblemDto: CreateProblemDto = req.body;
      const problem = await this.problemService.createProblem(createProblemDto);
      res.status(201).json(problem);
    } catch (e) {
      res.status(500).send({ error: e });
    }
  };

  generateTest = async (req: Request, res: Response): Promise<void> => {
    try {
      const test = await this.problemService.generateTest();
      res.status(200).json(test);
    } catch (e) {
      res.status(500).send({ error: e });
    }
  };
}

export default ProblemContoller;
