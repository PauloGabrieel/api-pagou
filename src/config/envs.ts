import dotenv from 'dotenv'

export default function loadEnvs () {
  let path = '.env.development'

  if (process.env.NODE_ENV === 'test') {
    path = '.env.test'
  }
  if (process.env.NODE_ENV === 'production') {
    path = '.env.production'
  }

  dotenv.config({ path })
};
