import TestModel from "./models/Test";
import UserModel from "../user/models/User";
import ProblemService from "../problems/problem-service";
import { ITest } from "./models/Test";

class TestService {
  private problemService: ProblemService;

  constructor() {
    this.problemService = new ProblemService();
  }

  async startTest(userId: string, type: string): Promise<ITest> {
    const testQuestions = await this.problemService.generateTest();
    const name = `Тест ${type}`
    const newTest = new TestModel({
      type,
      name,
      questions: testQuestions,
      userId,
    });

    await newTest.save();

    await UserModel.findByIdAndUpdate(userId, {
      $set: { currentTest: newTest },
      $push: { testHistory: newTest }
    });

    return newTest;
  }
}

export default TestService;
