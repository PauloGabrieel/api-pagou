import bcrypt from 'bcrypt'
import userRepository from '../repositories/userRepository'
import { duplicatedEmailError } from '../errors/duplicateEmailError'
import { CreateUserParams } from '../protocols'

async function create ({ name, email, password }: CreateUserParams) {
  await emailAlready(email)

  const hashPassword = await createHashPassword(password)
  password = hashPassword

  await userRepository.create({ name, email, password })
};

async function emailAlready (email: string) {
  const user = await userRepository.findByEmail(email)

  if (user) {
    throw duplicatedEmailError()
  }
};

async function createHashPassword (password: string) {
  const hash = 12
  const hashPassword = await bcrypt.hash(password, hash)
  return hashPassword
};
export const userService = {
  create
}
