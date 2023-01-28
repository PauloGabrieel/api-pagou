import Joi from "joi"
import { CreateUserParams } from "../protocols";

const createUserSchema = Joi.object<CreateUserParams>({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().min(6).required()
});

export default createUserSchema;
