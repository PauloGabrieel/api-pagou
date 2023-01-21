import { Request, Response, NextFunction } from "express"
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { prisma } from "../config/database";
import unauthorizadeError from "../errors/unauthorizedError";

export async function authenticationToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const autHeader = req.header("Authorization")
    
    if(!autHeader) return unauthorizedResponse(res); 
    
    const token = autHeader.replace("Bearer", "");

    try {
        const { userId } = jwt.verify(token, process.env.SECRET_KEY) as JWTPayload
        
        const session = await prisma.session.findFirst({
            where:{
                token: token
            }
        })
        console.log("caiu no session")
        if(!session) return unauthorizedResponse(res);
        req.userId = userId
        return next()
    } catch (error) {
        return unauthorizedResponse(res);    
    }
    

    
}

function unauthorizedResponse(res: Response){
    const messsage = "You must be signed in to continue";
    return res.status(httpStatus.UNAUTHORIZED).send(unauthorizadeError(messsage))
}

type JWTPayload = {
    userId: number
}
type AuthenticatedRequest = Request & JWTPayload;
