import app, { init } from '../../src/app'
import { createUser } from '../factories/userFactory'
import { cleanDb, generateValidTokenWithoutSession, generateValidToken } from '../helpers'
import supertest from 'supertest'
import { faker } from '@faker-js/faker'
import httpStatus from 'http-status'
import { createTransactions, generetaValidBodyToTransactions } from '../factories/transactionsFactory'
import { createPayable } from '../factories/payableFactory'
import { prisma } from '../../src/config/database'

beforeAll(async () => {
  await init()
})

afterEach(async () => {
  await cleanDb()
})

const server = supertest(app)

describe('GET /transactions', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/transactions')

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
  })

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word()
    const response = await server.get('/transactions').set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
  })

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser()
    const token = generateValidTokenWithoutSession(userWithoutSession.id)
    const response = await server.get('/transactions').set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
  })

  describe('when token is valid', () => {
    it('should respond with status 200 and empty array when there are no transactions created', async () => {
      const user = await createUser()
      const token = await generateValidToken(user)
      const response = await server.get('/transactions').set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(httpStatus.OK)
      expect(response.body).toEqual([])
    })

    it('should respond with status 200 and list with all transactions', async () => {
      const user = await createUser()
      const token = await generateValidToken(user)
      const transactionBody = generetaValidBodyToTransactions(user.id)
      const transaction = await createTransactions(transactionBody)
      await createPayable(transaction.id, user.id)
      const response = await server.get('/transactions').set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(httpStatus.OK)
      expect(response.body).toEqual([{
        id: transaction.id,
        value: transactionBody.value,
        description: transactionBody.description,
        paymentMethod: transactionBody.paymentMethod,
        cardLastDigits: transactionBody.cardLastDigits,
        cardIssuer: transactionBody.cardIssuer,
        cardHolderName: transactionBody.cardHolderName
      }])
    })
  })
})

describe('POST /transactions', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/transactions')

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
  })

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word()
    const response = await server.post('/transactions').set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
  })

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser()
    const token = generateValidTokenWithoutSession(userWithoutSession.id)
    const response = await server.post('/transactions').set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
  })

  describe('when token is valid', () => {
    it('should respond with status 400 when body is not send', async () => {
      const token = await generateValidToken()
      const response = await server.post('/transactions').set('Authorization', `Bearer ${token}`).send({})

      expect(response.status).toBe(httpStatus.BAD_REQUEST)
    })

    it('should respond with status 201 when body when body is correctly send', async () => {
      const user = await createUser()
      const token = await generateValidToken(user)
      const body = generetaValidBodyToTransactions()
      const beforeCount = await prisma.transaction.count()
      const response = await server.post('/transactions').set('Authorization', `Bearer ${token}`).send(body)
      const afterCount = await prisma.transaction.count()

      expect(response.status).toBe(httpStatus.CREATED)
      expect(beforeCount).toBe(0)
      expect(afterCount).toBe(1)
    })
  })
})

describe('DELETE /transactions', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.delete('/transactions/1')

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
  })

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word()
    const response = await server.delete('/transactions/1').set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
  })

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser()
    const token = generateValidTokenWithoutSession(userWithoutSession.id)
    const response = await server.delete('/transactions/1').set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
  })
  describe('when token is valid', () => {
    it('should respond with status 404 when the given transactionId does not exist', async () => {
      const user = await createUser()
      const token = await generateValidToken(user)
      const response = await server.delete('/transactions/1').set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(httpStatus.NOT_FOUND)
    })

    it('should respond with status 401 when the transaction does not belong to the user', async () => {
      const user = await createUser()
      const transactionBody = generetaValidBodyToTransactions(user.id)
      const transaction = await createTransactions(transactionBody)
      await createPayable(transaction.id, user.id)
      const anotherUser = await createUser()
      const token = await generateValidToken(anotherUser)
      const response = await server.delete(`/transactions/${transaction.id}`).set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    })

    it('should respond with status 200, when the transaction is deleted', async () => {
      const user = await createUser()
      const transactionBody = generetaValidBodyToTransactions()
      const transaction = await createTransactions({ ...transactionBody, userId: user.id })
      await createPayable(transaction.id, user.id)
      const transactionsBeforeCount = await prisma.transaction.count()
      const payblesBeforeCount = await prisma.payable.count()
      const token = await generateValidToken(user)
      const response = await server.delete(`/transactions/${transaction.id}`).set('Authorization', `Bearer ${token}`)
      const transactionsAfterCount = await prisma.transaction.count()
      const payblesAfterCount = await prisma.payable.count()

      expect(response.status).toBe(httpStatus.OK)
      expect(transactionsBeforeCount).toBe(1)
      expect(payblesBeforeCount).toBe(1)
      expect(transactionsAfterCount).toBe(0)
      expect(payblesAfterCount).toBe(0)
    })
  })
})
