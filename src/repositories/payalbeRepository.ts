import { prisma } from "../config/database";
import { PaymentStatus } from "@prisma/client";

async function create(transactionId: number, userId: number, status: PaymentStatus){
    return prisma.payable.create({
        data:{
            transactionId,
            userId,
            status,
        }
    })
};

const payableRepository = {
    create
};

export default payableRepository;
