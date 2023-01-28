import express from 'express';
import "express-async-errors"
import cors from "cors";
import authenticationRouter  from './routers/authenticationRouter';
import userRouter from './routers/userRouter';

const app = express();

app
    .use(cors())
    .use(express.json())
    .get("/health", (_req, res) => res.send("ok"))
    .use("/signup", userRouter)
    .use("/signin", authenticationRouter)
    
app.listen(4000, () => {
    console.log('Server running...');
});

export default app
