import { faker } from '@faker-js/faker'
import { CardType } from '@prisma/client'
import { prisma } from '../../src/config/database'
import { CreateTransactionsParams } from '../../src/protocols'

export function generetaValidBodyToTransactions () {
  return {
    value: Number(faker.commerce.price(100, 500, 0)),
    description: faker.commerce.productName(),
    paymentMethod: CardType.credit_card,
    cardLastDigits: faker.finance.creditCardNumber('63[7-9]#-####-####-###L').slice(-4),
    cardIssuer: faker.finance.creditCardIssuer(),
    cardHolderName: faker.finance.accountName()
  }
}

export async function createTransactions (transactionsData: CreateTransactionsParams) {
  return prisma.transaction.create({
    data: {
      ...transactionsData,
      value: transactionsData.value * 100
    }
  })
}
