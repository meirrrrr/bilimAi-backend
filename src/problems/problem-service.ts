import { CreateProblemDto } from "./dtos/CreateProblem.dto";
import ProblemModel, { IProblem } from "./models/Problems";

class ProblemService {
  async getProblems(): Promise<IProblem[]> {
    const problems = ProblemModel.find().exec();
    return problems;
  }

  async createProblem(createProblemDto: CreateProblemDto): Promise<IProblem> {
    const { question, correct_answer, incorrect_answers, difficulty, topic } =
      createProblemDto;

    const newProblem = new ProblemModel({
      question,
      correct_answer,
      incorrect_answers,
      difficulty,
      topic,
    });

    await newProblem.save();

    return newProblem;
  }

  async generateTest(): Promise<IProblem[]> {
    const questions = await ProblemModel.find();
    questions.sort(() => 0.5 - Math.random());

    const topicCount: Record<string, number> = {};
    const testQuestions: IProblem[] = [];
    const usedQuestions: Set<string> = new Set();

    for (const question of questions) {
      const topic = question.topic;

      if (!topicCount[topic]) {
        topicCount[topic] = 0;
      }

      if (
        topicCount[topic] < 3 &&
        testQuestions.length < 30 &&
        !usedQuestions.has(question.question)
      ) {
        testQuestions.push(question);
        topicCount[topic]++;
        usedQuestions.add(question.question);
      }

      if (testQuestions.length === 30) {
        break;
      }
    }
    return testQuestions;
  }
}

export default ProblemService;
