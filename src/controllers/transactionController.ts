import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "../middlewares/authenticationMiddleware";
import { getTransactions, postTransactions } from "../services/transactionService";
import { CreateTransactionsParams } from "../protocols";

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

export async function createTransactions(req: AuthenticatedRequest, res: Response) {
    const {
        value,
        cardIssuer,
        description, 
        paymentMethod, 
        cardLastDigits 
    } = req.body as CreateTransactionsParams;
    const { userId } = req
    try {
        const transaction = await postTransactions({cardIssuer, cardLastDigits, description, paymentMethod, userId, value});
        return res.status(httpStatus.CREATED).send("created transaction");
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
     
};
