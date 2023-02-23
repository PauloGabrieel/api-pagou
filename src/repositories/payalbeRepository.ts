import { prisma } from '../config/database'
import { CreatePayableParams } from '../protocols'
import { PaymentStatus } from '@prisma/client'

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

async function list (userId : number, status: PaymentStatus) {
  return prisma.payable.findMany({
    where: { userId, status }
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
