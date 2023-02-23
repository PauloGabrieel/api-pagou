import { PaymentStatus } from '@prisma/client'
import { Response } from 'express'
import httpStatus from 'http-status'
import { AuthenticatedRequest } from '../middlewares/authenticationMiddleware'
import payableService from '../services/payableService'

export async function listPayables (req: AuthenticatedRequest, res: Response) {
  const { userId } = req
  const status = req.query.status as PaymentStatus
  try {
    const payables = await payableService.getPayables(userId, status)
    return res.status(httpStatus.OK).send(payables)
  } catch (error) {
    return res.sendStatus(500)
  }
}
