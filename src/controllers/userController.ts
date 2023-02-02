import { Request, Response } from "express"
import httpStatus from "http-status"
import { userService } from "../services/userService"
import { CreateUserParams } from "../protocols";

export async function createUser(req: Request, res: Response) {
    const { name, email, password } = req.body as CreateUserParams;
    try {
        const user = await userService.create({name, email, password})
        return res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        if(error.name === "DuplicatedEmailError") {
            return res.status(httpStatus.CONFLICT).send(error.message);
        }
        return
    }
}

