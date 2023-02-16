import dotenv from 'dotenv'

export default function loadEnvs () {
  let path = '.env'

  if (process.env.NODE_ENV === 'test') {
    path = '.env.test'
  }

  dotenv.config({ path })
};
