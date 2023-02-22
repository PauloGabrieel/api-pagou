import { Response } from 'express'
import httpStatus from 'http-status'
import { AuthenticatedRequest } from '../middlewares/authenticationMiddleware'
import transactionService from '../services/transactionService'
import { CreateTransactionsParams } from '../protocols'

export async function listTransactions (req: AuthenticatedRequest, res: Response) {
  const { userId } = req

  try {
    const transctions = await transactionService.getTransactions(userId)
    return res.status(httpStatus.OK).send(transctions)
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error)
  };
};

export async function createTransactions (req: AuthenticatedRequest, res: Response) {
  const {
    value,
    cardIssuer,
    description,
    paymentMethod,
    cardLastDigits,
    cardHolderName
  } = req.body as CreateTransactionsParams
  const { userId } = req
  try {
    await transactionService.postTransactions({ cardHolderName, cardIssuer, cardLastDigits, description, paymentMethod, userId, value })
    return res.status(httpStatus.CREATED).send('created transaction')
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  };
};

export async function deleteTransaction (req: AuthenticatedRequest, res: Response) {
  const transactionId = Number(req.params.transactionId)
  const { userId } = req
  console.log(userId)
  try {
    await transactionService.deleteTransactiontionById({ userId, transactionId })
    return res.sendStatus(httpStatus.OK)
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.status(httpStatus.UNAUTHORIZED).send(error)
    }
    return res.status(httpStatus.NOT_FOUND).send(error)
  }
}
