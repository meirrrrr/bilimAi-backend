import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  username?: string;
  password: string;
  currentTest?: mongoose.Types.ObjectId;
  testHistory: mongoose.Types.ObjectId[];
  interests: string[];
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
      createdAt: Date
    }
  ],
  interests: [{ type: String }]
});
const UserModel = mongoose.model<IUser>("User", UserSchema)
export default UserModel;
