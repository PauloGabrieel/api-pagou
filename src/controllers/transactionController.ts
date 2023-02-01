import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "../middlewares/authenticationMiddleware";
import { getTransactions } from "../services/transactionService";

export async function listTransactions(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    
    try {
        const transctions = await getTransactions(userId);
        return res.status(httpStatus.OK).send(transctions);
    } catch (error) {
        console.log(error);
        return res.status(httpStatus.NOT_FOUND).send(error);
    };
};

