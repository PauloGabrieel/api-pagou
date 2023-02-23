import { PaymentStatus } from '@prisma/client'
import payableRepository from '../repositories/payalbeRepository'

async function getPayables (userId: number, status?: PaymentStatus) {
  const payables = await payableRepository.list(userId, status)

  payables.forEach(payable => {
    payable.value = convertCentsInReal(payable.value)
  })

  return payables
}

function convertCentsInReal (value: number) {
  const CENTS_IN_REAIS = 100
  return value / CENTS_IN_REAIS
}

const payableService = {
  getPayables
}

export default payableService
