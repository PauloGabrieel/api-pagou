import express, { Express } from 'express';
import cors from "cors";
import authenticationRouter  from './routers/authenticationRouter';
import userRouter from './routers/userRouter';
import { connectDb, disconnectDb } from './config/database';

const app = express();

app
    .use(cors())
    .use(express.json())
    .use("/signup", userRouter)
    .use("/signin", authenticationRouter);

export function init(): Promise<Express> {
    connectDb()
    return Promise.resolve(app);
};

export async function close(): Promise<void> {
    await disconnectDb();
};

export default app
