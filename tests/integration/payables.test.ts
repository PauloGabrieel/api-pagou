import app, { init } from '../../src/app'
import { createUser } from '../factories/userFactory'
import { cleanDb, generateValidTokenWithoutSession, generateValidToken } from '../helpers'
import supertest from 'supertest'
import { faker } from '@faker-js/faker'
import httpStatus from 'http-status'
import { createTransactions, generetaValidBodyToTransactions } from '../factories/transactionsFactory'
import { createPayable } from '../factories/payableFactory'

beforeAll(async () => {
  await init()
})

afterEach(async () => {
  await cleanDb()
})

const server = supertest(app)

describe('GET /payables', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/payables')

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
  })

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word()
    const response = await server.get('/payables').set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
  })

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser()
    const token = generateValidTokenWithoutSession(userWithoutSession.id)
    const response = await server.get('/payables').set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
  })

  describe('when token is valid', () => {
    it('should respond with status 200 and empty array when there are no payables', async () => {
      const user = await createUser()
      const token = await generateValidToken(user)
      const response = await server.get('/payables').set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(httpStatus.OK)
      expect(response.body).toEqual([])
    })

    it('should respond with status 200 and list with all payables', async () => {
      const user = await createUser()
      const token = await generateValidToken(user)
      const transactionBody = generetaValidBodyToTransactions(user.id)
      const transaction = await createTransactions(transactionBody)
      const paybles = await createPayable(transaction.id, user.id)
      const response = await server.get('/payables').set('Authorization', `Bearer ${token}`)

      console.log(paybles)

      expect(response.status).toBe(httpStatus.OK)
      expect(response.body).toEqual([{
        id: paybles.id,
        value: paybles.value / 100,
        status: paybles.status,
        userId: paybles.userId,
        transactionId: paybles.transactionId,
        paymentDate: paybles.paymentDate.toISOString()
      }])
    })
  })
})
