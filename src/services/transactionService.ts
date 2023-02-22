import transactionRepository from '../repositories/transactionRepository'
import payableRepository from '../repositories/payalbeRepository'
import { notFoundError } from '../errors/notFoundError'
import { CreateTransactionsParams, DeleteTransactionParams } from '../protocols'
import { PaymentStatus, CardType, Transaction } from '@prisma/client'
import unauthorizadeError from '../errors/unauthorizedError'

type UserId = {userId: number}
export type TransactionAndUserId = CreateTransactionsParams & UserId;

function convertCentsInReal (value: number) {
  const CENTS_IN_REAIS = 100
  return value / CENTS_IN_REAIS
}

function convertRealIntoCents (value: number) {
  const REAIS_IN_CENTS = 100
  return Math.ceil(value * REAIS_IN_CENTS)
};

function getLastDigits (cardNumber: string) {
  return cardNumber.slice(-4)
};

function paidOrExpectingFunds (paymentMethod: string) {
  if (paymentMethod === CardType.debit_card) {
    return PaymentStatus.paid
  };

  return PaymentStatus.waiting_funds
};

function formatData (paymentMethod: string) {
  if (paymentMethod === CardType.debit_card) {
    const paymentToday = new Date()
    return paymentToday
  };

  const todyInMilliseconds = new Date().getTime()
  const thirtyDaysInMilliseconds = 1000 * 60 * 60 * 24 * 30
  const paymentInThirtyDays = new Date(todyInMilliseconds + thirtyDaysInMilliseconds)
  return paymentInThirtyDays
};

function calcTax (paymentMethod: string, value: number) {
  if (paymentMethod === CardType.debit_card) {
    const valueWithreePercentfee = value * 1.0 - 0o3
    return valueWithreePercentfee
  }
  const valueWitwoPercentfee = value * 1.0 - 0o3
  return valueWitwoPercentfee
};

function formatTransactionData (transactions: Transaction[]) {
  transactions.forEach((transaction) => {
    transaction.value = convertCentsInReal(transaction.value)
    delete transaction.updatedAt
    delete transaction.createdAt
    delete transaction.userId
  })
}

async function getTransactionOrFail (transactionId: number) {
  const transaction = await transactionRepository.findUnique(transactionId)
  if (!transaction) {
    throw notFoundError()
  }
  return transaction
}

function transactionBelongTheUser (transactionUserId: number, userId: number) {
  if (transactionUserId !== userId) {
    const message = 'transaction does not belong to the user'
    throw unauthorizadeError(message)
  }
}

async function getTransactions (userId: number) {
  const transactions = await transactionRepository.list(userId)

  formatTransactionData(transactions)
  return transactions
}

async function postTransactions ({
  cardIssuer,
  cardLastDigits,
  value,
  description,
  paymentMethod,
  userId,
  cardHolderName
}: TransactionAndUserId) {
  const valueInCents = convertRealIntoCents(value)
  cardLastDigits = getLastDigits(cardLastDigits)

  const { id: transactionId } = await transactionRepository.create({ cardHolderName, cardIssuer, cardLastDigits, description, paymentMethod, value: valueInCents, userId })

  const status = paidOrExpectingFunds(paymentMethod)
  const paymentDate = formatData(paymentMethod)
  const valueWithfeeInCent = convertRealIntoCents(calcTax(paymentMethod, value))

  await payableRepository.create({ transactionId, userId, status, paymentDate, value: valueWithfeeInCent })
}

async function deleteTransactiontionById ({ transactionId, userId }: DeleteTransactionParams) {
  const transaction = await getTransactionOrFail(transactionId)
  const payableId = transaction.Payable[0].id
  transactionBelongTheUser(transaction.userId, userId)

  await payableRepository.deleteUnique(payableId)
  await transactionRepository.deleteUnique(transaction.id)
}

const transactionService = {
  getTransactions,
  postTransactions,
  deleteTransactiontionById
}

export default transactionService
