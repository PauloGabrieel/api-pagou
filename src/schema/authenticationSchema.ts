import { UserParams } from '../protocols'
import Joi from 'joi'

const authUserSchema = Joi.object<UserParams>({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6)
})

export default authUserSchema
