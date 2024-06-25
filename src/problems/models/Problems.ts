import mongoose, { Document, Schema } from "mongoose";

export interface IProblem extends Document {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  difficulty: string;
  topic: string;
}

const ProblemSchema: Schema = new Schema({
  question: { type: String, required: true },
  correct_answer: { type: String, required: true },
  incorrect_answers: { type: [String], required: true },
  difficulty: { type: String, required: true },
  topic: { type: String, required: true },
});

const ProblemModel = mongoose.model<IProblem>("Problems", ProblemSchema);

export default ProblemModel;
