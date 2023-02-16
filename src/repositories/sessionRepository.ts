import { SessionParams } from '../protocols'
import { prisma } from '../config/database'

async function create ({ token, userId }: SessionParams) {
  await prisma.session.create({
    data: {
      token,
      userId
    }
  })
}

const sessionRepository = {
  create
}

export default sessionRepository
