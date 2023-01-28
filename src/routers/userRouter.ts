import { Router } from "express"
import { createUser } from "../controllers/userController";
import { validateBody } from "../middlewares/validationMiddleware";
import createUserSchema from "../schema/userSchema";
const userRouter = Router();

userRouter
    .post("/",validateBody(createUserSchema) ,createUser)

export default userRouter;
