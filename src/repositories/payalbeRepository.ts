import { prisma } from '../config/database'
import { CreatePayableParams } from '../protocols'

async function create ({ value, transactionId, userId, status, paymentDate }: CreatePayableParams) {
  return prisma.payable.create({
    data: {
      transactionId,
      userId,
      status,
      paymentDate,
      value
    }
  })
};

async function list (userId : number) {
  return prisma.payable.findMany({
    where: { userId },
    include: { Transaction: true }
  })
}

async function deleteUnique (id: number) {
  return prisma.payable.delete({
    where: {
      id
    }
  })
}

const payableRepository = {
  create,
  list,
  deleteUnique
}

export default payableRepository
