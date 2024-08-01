import TestModel from "./models/Test";
import UserModel from "../user/models/User";
import ProblemService from "../problems/problem-service";
import { ITest } from "./models/Test";
import mongoose from "mongoose";

interface DetailedResult {
  questionId: mongoose.Types.ObjectId;
  question: string;
  userAnswer: string | null;
  correctAnswer: string;
  correct: boolean;
}

class TestService {
  private problemService: ProblemService;

  constructor() {
    this.problemService = new ProblemService();
  }

  async startTest(userId: string, type: string): Promise<ITest> {
    const testQuestions = await this.problemService.generateTest();
    const name = `Тест ${type}`;
    const newTest = new TestModel({
      type,
      name,
      questions: testQuestions,
      userId,
    });

    await newTest.save();

    await UserModel.findByIdAndUpdate(userId, {
      $set: { currentTest: newTest._id },
      $push: {
        testHistory: { testId: newTest._id, name, createdAt: new Date() },
      },
    });

    return newTest;
  }

  async submitTest(userId: string, testId: string, answers: any): Promise<any> {
    const test = await TestModel.findById(testId).populate("questions");
    if (!test) {
      throw new Error("Test not found");
    }

    const results = this.calculateResults(test.questions, answers);
    test.results = results;
    test.completedAt = new Date();
    await test.save();

    const detailedResults = results.detailedResults;

    await UserModel.findByIdAndUpdate(userId, {
      $set: { currentTest: null },
      $push: {
        testHistory: {
          testId: test._id,
          name: test.name,
          createdAt: test.createdAt,
          questions: detailedResults,
          score: results.score,
        },
      },
    });

    return test;
  }

  private calculateResults(questions: any[], answers: any[]): any {
    let score = 0;
    const detailedResults: DetailedResult[] = [];

    questions.forEach((question, index) => {
      const userAnswer = answers.find(
        (answer) => answer.questionId === question._id.toString()
      );

      const isCorrect =
        userAnswer && question.correctAnswer === userAnswer.answer;

      if (isCorrect) {
        score++;
      }

      detailedResults.push({
        questionId: question._id,
        question: question.question,
        userAnswer: userAnswer ? userAnswer.answer : null,
        correctAnswer: question.correctAnswer,
        correct: isCorrect,
      });
    });

    return { score, total: questions.length, detailedResults };
  }
}

export default TestService;
