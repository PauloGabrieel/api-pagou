import transactionRepository from "../repositories/transactionRepository"
import { notFoundError } from "../errors/notFoundError";

export async function getTransactions(userId: number) {
    const transactions = await transactionRepository.list(userId);

    if(!transactions) {
        throw notFoundError();
    };

    return transactions;
};
