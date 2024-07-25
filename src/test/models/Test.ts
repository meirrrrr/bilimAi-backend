import mongoose, { Document, Schema } from "mongoose";

export interface ITest extends Document {
  type: string;
  name: string;
  questions: mongoose.Types.ObjectId[];
  createdAt: Date;
  userId: mongoose.Types.ObjectId;
}

const TestSchema: Schema = new Schema({
  type: { type: String, required: true },
  name: {type: String, required: true},
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problems", required: true }],
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

export default mongoose.model<ITest>("Test", TestSchema);