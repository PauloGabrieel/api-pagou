import { prisma } from '../src/config/database'
import * as jwt from 'jsonwebtoken'
import { User } from '@prisma/client'
import { createUser } from './factories/userFactory'
import { createSession } from './factories/sessionFactory'

export async function cleanDb () {
  await prisma.session.deleteMany({})
  await prisma.payable.deleteMany({})
  await prisma.transaction.deleteMany({})
  await prisma.user.deleteMany({})
};

export async function generateValidToken (user?: User) {
  const incomingUser = user || (await createUser())
  console.log(incomingUser)
  const token = jwt.sign({ userId: incomingUser.id }, process.env.SECRET_KEY)

  await createSession(token, incomingUser.id)

  return token
}

export async function generateValidTokenWithoutSession (userId: number) {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY)

  return token
}
