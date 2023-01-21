import Joi from "joi"
import { UserCreation } from "../repositories/userRepository"

export const createUserSchema = Joi.object<UserCreation>({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().min(6).required()
});