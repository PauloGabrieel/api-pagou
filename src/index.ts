import express from 'express';
import cors from "cors"
import expenseRouter  from './routers/expenseRouter';

const app = express();

app
    .use(cors())
    .use(express.json())
    .get("/health", (_req, res) => res.send("ok"))
    .use("/expense", expenseRouter)

app.listen(4000, () => {
    console.log('Server running...');
});