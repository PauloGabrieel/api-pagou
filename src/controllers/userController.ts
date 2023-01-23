import { Request, Response } from "express"
import httpStatus from "http-status"
import { UserCreation } from "../repositories/userRepository"
import { userService } from "../services/userService"

export async function createUser(req: Request, res: Response) {
    const { name, email, password } = req.body as UserCreation
    try {
        const user = await userService.create({name, email, password})
        return res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        console.log(error)
        if(error.name === "DuplicatedEmailError") {
            return res.status(httpStatus.CONFLICT).send(error.message);
        }
    }
}

