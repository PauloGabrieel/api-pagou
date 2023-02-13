import { prisma } from "../config/database";
import { CreateTransactionsParams } from "../protocols";
async function list(userId: number) {
    return prisma.transaction.findMany({
        include:{
            Playable: {
                where: {
                    userId
                }
            }
        }
    });
};

async function create({cardHolderName, cardIssuer, cardLastDigits,description, paymentMethod, value}:CreateTransactionsParams) {
    return prisma.transaction.create({
        data:{
            cardIssuer,
            cardLastDigits,
            description,
            paymentMethod,
            value,
            cardHolderName
        }
    });
};

const transactionRepository = {
    list,
    create
};

export default transactionRepository;
