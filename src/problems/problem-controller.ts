import { CreateProblemDto } from "./dtos/CreateProblem.dto";
import ProblemService from "./problem-service";
import e, { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

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

  generateAiTest = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
      const response = axios.post(`${process.env.FASTAPI_URL}`, {
        user_id: data.user_id,
        user_question: data.user_question,
        previous_answers: data.previous_answers,
      });
    } catch (error) {
      console.error({ message: error });
    }
  };

  // aiGeneratedTest = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     console.log(5);
  //     const test = gptModelResponse(
  //       "You are Teacher of Mathematics for 6-7 graders. Generate some question according to json.",
  //       "Send me some questions",
  //       0.9
  //     );
  //     res.status(200).json(test);
  //   } catch (e) {
  //     res.status(500).send({ error: e });
  //   }
  // };

  // geminiGenerateTest = async (req: Request, res: Response): Promise<void> => {
  //   const genAi = new GoogleGenerativeAI(process.env.OPENAI_API!);
  //   const model = genAi.getGenerativeModel({
  //     model: "gemini-1.5-flash",
  //     generationConfig: { responseMimeType: "application/json" },
  //   });

  //   const prompt =
  //     "You are Teacher of Mathematics for 6-7 graders. Generate 10 question for math, and 10 question for logic response to json, and create on russion language.";

  //   const result = await model.generateContent(prompt);
  //   console.log(result.response.text());
  //   res.status(200).send(result.response.text());
  // };
}

export default ProblemContoller;
