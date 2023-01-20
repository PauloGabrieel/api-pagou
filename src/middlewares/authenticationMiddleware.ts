import { Request, Response, NextFunction } from "express"
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { prisma } from "../config/database";

export async function authenticationToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const autHeader = req.header("Authorization")
    if(!autHeader) return res.status(httpStatus.UNAUTHORIZED).send("You must be signed in to continue");

    const token = autHeader.replace("Bearer", "");

    try {
        const { userId } = jwt.verify(token, process.env.SECRET_KEY) as JWTPayload
        
        const session = await prisma.session.findFirst({
            where:{
                token: token
            }
        })

        if(!session) return res.status(httpStatus.UNAUTHORIZED).send("You must be signed in to continue");
        req.userId = userId
        return next()
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).send("You must be signed in to continue");    
    }
    

    
}

type JWTPayload = {
    userId: number
}
type AuthenticatedRequest = Request & JWTPayload;
