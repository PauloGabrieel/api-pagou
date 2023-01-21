import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { createUserSchema } from "../schema/autheticationSchema";
import { invalidDataError } from "../errors/invalidDataError";

export function validate(req: Request, res: Response, next: NextFunction){
    const userBodyParam = req.body
    const { error } = createUserSchema.validate(userBodyParam,{abortEarly: false});

    if(!error) {
        next()
    }else {
        const details = error.details.map(e => e.message)
        res.status(httpStatus.BAD_REQUEST).send(invalidDataError(details));
    }
}