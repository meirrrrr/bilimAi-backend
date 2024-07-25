import { Router } from "express";
import UserService from "./user-service";
import UserController from "./user-controller";

const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.get("/users", userController.getUsers);
userRouter.get("/user/:id", userController.getUserById);
// problemRouter.get("/mathquestion", problemController.aiGeneratedTest);
// problemRouter.get("/mathQuiz", problemController.geminiGenerateTest);

export default userRouter;
