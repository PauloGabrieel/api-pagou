import transactionRepository from "../repositories/transactionRepository"
import payableRepository from "../repositories/payalbeRepository";
import { notFoundError } from "../errors/notFoundError";
import { CreateTransactionsParams } from "../protocols";
import { PaymentStatus, CardType } from "@prisma/client";

type UserId = {userId: number}
export type TransactionAndUserId = CreateTransactionsParams & UserId;

export async function getTransactions(userId: number) {
    const transactions = await transactionRepository.list(userId);

    if(!transactions) {
        throw notFoundError();
    };

    transactions.forEach((transaction)=>{
        delete transaction.Playable;
        delete transaction.updatedAt;
        delete transaction.createdAt;
        transaction.value = convertCentsInReal(transaction.value);
        
    })
    return transactions;
};

export async function postTransactions ({ 
    cardIssuer, 
    cardLastDigits, 
    value, 
    description, 
    paymentMethod, 
    userId
}: TransactionAndUserId) {
    value = convertRealIntoCents(value);
    cardLastDigits = getLastDigits(cardLastDigits);

    const { id: transactionId } = await transactionRepository.create({ cardIssuer, cardLastDigits, description, paymentMethod, value })

    const status = paidOrExpectingFunds(paymentMethod);    

    await payableRepository.create(transactionId, userId, status);
};

function convertCentsInReal(value: number) {
    const CENTS_IN_REAIS = 100;
    return value / CENTS_IN_REAIS;
}

function convertRealIntoCents(value: number) {
    const REAIS_IN_CENTS = 100;
    return value * REAIS_IN_CENTS; 
};

function getLastDigits(cardNumber: string) {
    return cardNumber.slice(-4);
};

function paidOrExpectingFunds(paymentMethod: string){
    if(paymentMethod === CardType.credit_card) {
        return PaymentStatus.waiting_funds;
    };

    return PaymentStatus.paid;  
};