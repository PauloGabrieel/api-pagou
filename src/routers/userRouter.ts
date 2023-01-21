import { Router } from "express"
import { createUser } from "../controllers/userController";
import { validate } from "../middlewares/validationMiddleware";

const userRouter = Router();

userRouter
    .post("/",validate ,createUser)

export default userRouter;
