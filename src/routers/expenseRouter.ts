import { Router } from "express"
import { authenticationToken } from "../middlewares/authenticationMiddleware"

const expenseRouter = Router()

expenseRouter
    .all("/",authenticationToken)    
    .get("/")

export default expenseRouter 
