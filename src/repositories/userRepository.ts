import { prisma } from '../config/database'
import { CreateUserParams } from '../protocols'

async function create ({ name, email, password }: CreateUserParams) {
  await prisma.user.create({
    data: {
      name,
      email,
      password
    }
  })
}
async function findByEmail (email: string) {
  return prisma.user.findFirst({
    where: {
      email
    }
  })
}

const userRepository = {
  create,
  findByEmail
}

export default userRepository
