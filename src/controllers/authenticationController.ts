import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserParams } from "../protocols";
import authenticationService from "../services/authenticationService";

export async function signInPost(req: Request, res: Response) {
    const { email, password } = req.body as UserParams;

    try {
        const result = await authenticationService.signIn({email, password});
        return res.status(httpStatus.OK).send(result);
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).send(error)
    }
}