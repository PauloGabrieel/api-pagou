import { prisma } from '../config/database'
import { CreateTransactionsParams } from '../protocols'
async function list (userId: number) {
  return prisma.transaction.findMany({
    where: {
      userId
    }
  })
};

async function create ({ cardHolderName, cardIssuer, cardLastDigits, description, paymentMethod, value, userId }:CreateTransactionsParams) {
  return prisma.transaction.create({
    data: {
      cardIssuer,
      cardLastDigits,
      description,
      paymentMethod,
      value,
      cardHolderName,
      userId
    }
  })
};

async function findUnique (id: number) {
  return prisma.transaction.findFirst({
    where: {
      id
    },
    include: {
      Payable: true
    }
  })
}

async function deleteUnique (id: number) {
  return prisma.transaction.delete({
    where: {
      id
    }
  })
}

const transactionRepository = {
  list,
  create,
  findUnique,
  deleteUnique
}

export default transactionRepository
