import { Router } from "express";
import { signInPost } from "../controllers/authenticationController";
import { validateBody } from "../middlewares/validationMiddleware";
import authUserSchema from "../schema/authenticationSchema";

const authenticationRouter = Router()

authenticationRouter
    .post("/",validateBody(authUserSchema), signInPost)

export default authenticationRouter 
