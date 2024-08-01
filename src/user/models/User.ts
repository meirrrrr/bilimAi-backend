import mongoose, { Document, Schema } from "mongoose";

export interface ITestHistory {
  testId: mongoose.Types.ObjectId;
  name: string;
  createdAt: Date;
  questions: {
    questionId: mongoose.Types.ObjectId;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    correct: boolean;
  }[];
  score: string;
}

export interface IUser extends Document {
  email: string;
  username?: string;
  password: string;
  currentTest?: mongoose.Types.ObjectId;
  testHistory: ITestHistory[];
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String },
  password: { type: String, required: true },
  currentTest: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
  testHistory: [
    {
      testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
      name: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      questions: [
        {
          questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Problems" },
          question: { type: String, required: true },
          userAnswer: { type: String, required: true },
          correctAnswer: { type: String, required: true },
          correct: { type: Boolean, required: true },
        },
      ],
      score: { type: String },
    },
  ],
});

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
