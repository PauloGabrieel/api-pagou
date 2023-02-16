import { CreateTransactionsParams } from '../protocols'
import { CardType } from '@prisma/client'
import Joi from 'joi'

const createTransactionSchema = Joi.object<CreateTransactionsParams>({
  cardIssuer: Joi.string().required(),
  cardLastDigits: Joi.string().creditCard().required(),
  description: Joi.string().required(),
  value: Joi.number().required().greater(0),
  paymentMethod: Joi.string().valid(CardType.credit_card, CardType.debit_card).required(),
  cardHolderName: Joi.string().required()
})

export default createTransactionSchema
