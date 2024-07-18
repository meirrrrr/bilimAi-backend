import { Router } from "express";
import TestService from "./test-service";
import TestController from "./test-controller";


const testRouter = Router();

const testService = new TestService();
const testController = new TestController(testService);

testRouter.post("/start-test", testController.startTest);

export default testRouter;