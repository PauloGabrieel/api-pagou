import { prisma } from "../config/database";
import { CreatePayableParams } from "../protocols";

async function create({ value, transactionId, userId, status,paymentDate }: CreatePayableParams){
    return prisma.payable.create({
        data:{
            transactionId,
            userId,
            status,
            paymentDate,
            value
        }
    })
};

const payableRepository = {
    create
};

export default payableRepository;
