import express, { Express } from 'express'
import cors from 'cors'
import authenticationRouter from './routers/authenticationRouter'
import userRouter from './routers/userRouter'
import transactionRouter from './routers/transactionRouter'
import { connectDb, disconnectDb } from './config/database'
import loadEnvs from './config/envs'

loadEnvs()

const app = express()

app
  .use(cors())
  .use(express.json())
  .use('/signup', userRouter)
  .use('/signin', authenticationRouter)
  .use('/transactions', transactionRouter)

export function init (): Promise<Express> {
  connectDb()
  return Promise.resolve(app)
};

export async function close (): Promise<void> {
  await disconnectDb()
};

export default app
