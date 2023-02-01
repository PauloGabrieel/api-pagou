import { Router } from "express";
import { authenticationToken } from "../middlewares/authenticationMiddleware";
import { listTransactions } from "../controllers/transactionController";

const transactionRouter = Router();

transactionRouter
    .all("/", authenticationToken)
    .get("/", listTransactions)


export default transactionRouter;
