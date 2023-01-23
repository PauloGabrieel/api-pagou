import express from 'express';
import cors from "cors";
import expenseRouter  from './routers/expenseRouter';
import userRouter from './routers/userRouter';

const app = express();

app
    .use(cors())
    .use(express.json())
    .get("/health", (_req, res) => res.send("ok"))
    .use("/signup", userRouter)
    
app.listen(4000, () => {
    console.log('Server running...');
});

export default app
