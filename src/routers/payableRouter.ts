import { Router } from 'express'
import { authenticationToken } from '../middlewares/authenticationMiddleware'
import { listPayables } from '../controllers/payableController'

const payableRouter = Router()

payableRouter
  .all('/*', authenticationToken)
  .get('/', listPayables)

export default payableRouter
