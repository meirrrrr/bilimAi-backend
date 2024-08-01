import { Request, Response } from "express";
import TestService from "./test-service";

class TestController {
  private testService: TestService;

  constructor(testService: TestService) {
    this.testService = testService;
  }

  startTest = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, type } = req.body;
      if (!userId) {
        res.status(400).json({ message: "userId is required" });
        return;
      }
      if (!type) {
        res.status(400).json({ message: "type is required" });
        return;
      }
      const result = await this.testService.startTest(userId, type);
      res.status(201).json({ message: "Test started", test: result });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error });
    }
  };

  submitTest = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, testId, answers } = req.body;
      console.log(req.body);
      if (!userId || !testId || !answers) {
        res
          .status(400)
          .json({ message: "userId, testId, and answers are required" });
        return;
      }
      const result = await this.testService.submitTest(userId, testId, answers);
      res.status(200).json({ message: "Test submitted", result });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error });
    }
  };
}

export default TestController;
