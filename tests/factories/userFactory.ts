import { prisma } from '../../src/config/database'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'

export function invalidBody () {
  return {
    name: faker.name.fullName()
  }
};

export function generateValidBodyToSignUp () {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(6)
  }
}

export async function createUser (params: Partial<User> = {}) {
  const incomingPassword = params.password || faker.internet.password(6)
  const hashPassword = await bcrypt.hash(incomingPassword, 10)

  return prisma.user.create({
    data: {
      email: params.email || faker.internet.email(),
      name: params.name || faker.internet.userName(),
      password: hashPassword
    }
  })
};
