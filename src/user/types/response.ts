//Example of a response type
import mongoose from "mongoose";

export interface User {
  id: number;
  email: string;
  username: string;
  currentTest: mongoose.Types.ObjectId | null
  testHistory: mongoose.Types.ObjectId[] | null
}
