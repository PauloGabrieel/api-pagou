import dayjs from "dayjs";
import "dayjs/locale/pt-br";
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
    userId,
    cardHolderName
}: TransactionAndUserId) {
    const valueInCents = convertRealIntoCents(value);
    cardLastDigits = getLastDigits(cardLastDigits);

    const { id: transactionId } = await transactionRepository.create({cardHolderName, cardIssuer, cardLastDigits, description, paymentMethod, value: valueInCents })
    
    const status = paidOrExpectingFunds(paymentMethod); 
    const paymentDate = formatData(paymentMethod);
    const valueWithfeeInCent = convertRealIntoCents(calcTax(paymentMethod, value))

    await payableRepository.create({transactionId, userId, status, paymentDate, value: valueWithfeeInCent });
};

function convertCentsInReal(value: number) {
    const CENTS_IN_REAIS = 100;
    return value / CENTS_IN_REAIS;
}

function convertRealIntoCents(value: number) {
    const REAIS_IN_CENTS = 100;
    return Math.ceil(value * REAIS_IN_CENTS); 
};

function getLastDigits(cardNumber: string) {
    return cardNumber.slice(-4);
};

function paidOrExpectingFunds(paymentMethod: string){
    if(paymentMethod === CardType.debit_card) {
        return PaymentStatus.paid 
    };
    
    return PaymentStatus.waiting_funds     
};


function formatData(paymentMethod: string) {
    if(paymentMethod === CardType.debit_card) {
        const paymentToday = new Date();
        return paymentToday;
    };

    const todyInMilliseconds = new Date().getTime()
    const thirtyDaysInMilliseconds = 1000 * 60 * 60 * 24 * 30
    const paymentInThirtyDays = new Date(todyInMilliseconds + thirtyDaysInMilliseconds)
    return paymentInThirtyDays;
};

function calcTax(paymentMethod: string, value: number) {
    if(paymentMethod === CardType.debit_card) {
        const valueWithreePercentfee = value * 1.-0o3
        return valueWithreePercentfee
    }
    const valueWitwoPercentfee = value * 1.-0o3
    return valueWitwoPercentfee
};
