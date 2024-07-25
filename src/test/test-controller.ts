import  { Request, Response } from "express";
import TestService from "./test-service";

class TestController {
  private testService: TestService;

  constructor(testService: TestService) {
    this.testService = testService;
  }

  startTest = async (req: Request, res: Response):Promise<void> => {
   try {
     const { userId, type } = req.body;
     const result  = await this.testService.startTest(userId, type);

     if (!userId) {
       res.status(400).json({ message: "userId is required" });
    }

     res.status(201).json({ message: "Test started", test: result });

   }catch (error) {
     res.status(500).json({"message": "Server error", error})
   }
  }
}

export default TestController