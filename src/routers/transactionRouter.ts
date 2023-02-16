import { Router } from 'express'
import { authenticationToken } from '../middlewares/authenticationMiddleware'
import { listTransactions, createTransactions } from '../controllers/transactionController'
import { validateBody } from '../middlewares/validationMiddleware'
import createTransactionSchema from '../schema/transactionsSchema'

const transactionRouter = Router()

transactionRouter
  .all('/', authenticationToken)
  .get('/', listTransactions)
  .post('/', validateBody(createTransactionSchema), createTransactions)
  .put('/:transactionId')

export default transactionRouter
