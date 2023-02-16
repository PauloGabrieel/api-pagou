import { invalidCredentialsError } from '../errors/invalidCredentialsError'
import { UserParams, SigninResult } from '../protocols'
import userRepository from '../repositories/userRepository'
import sessionRepository from '../repositories/sessionRepository'
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

async function signIn (params: UserParams): Promise<SigninResult> {
  const { password, email } = params
  const user = await getUserOrFail(email)

  await validatePasswordOrFail(password, user.password)
  const token = await createSession(user.id)

  return {
    name: user.name,
    email: user.email,
    token
  }
}

async function getUserOrFail (email: string) {
  const user = await userRepository.findByEmail(email)
  if (!user) {
    throw invalidCredentialsError()
  };

  return user
};

async function validatePasswordOrFail (password: string, userPassword: string) {
  const isValidPassword = await bcrypt.compare(password, userPassword)
  if (!isValidPassword) {
    throw invalidCredentialsError()
  };
};

async function createSession (userId: number) {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY)
  await sessionRepository.create({ token, userId })

  return token
};
const authenticationService = {
  signIn
}

export default authenticationService
