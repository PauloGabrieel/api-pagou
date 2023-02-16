import { faker } from '@faker-js/faker'

export function generateValidBodyToSignIn () {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(6)
  }
};
