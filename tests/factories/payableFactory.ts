import { prisma } from '../../src/config/database'
import { PaymentStatus } from '@prisma/client'
import { faker } from '@faker-js/faker'

export async function createPayable (transactionId: number, userId: number) {
  return prisma.payable.create({
    data: {
      status: PaymentStatus.waiting_funds,
      value: Number(faker.commerce.price(100, 200)) * 100,
      paymentDate: faker.date.soon(30),
      transactionId,
      userId
    }
  })
}
