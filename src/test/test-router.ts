import { Router } from "express";
import TestService from "./test-service";
import TestController from "./test-controller";

const testRouter = Router();

const testService = new TestService();
const testController = new TestController(testService);

testRouter.post("/start-test", testController.startTest);
testRouter.post("/submit-test", testController.submitTest);
testRouter.post("/getTest", testController.getTestById);

export default testRouter;
