import { prisma } from "../config/database";

async function list(userId: number) {
    return prisma.transaction.findMany({
        include:{
            Playable: {
                where: {
                    userId
                }
            }
        }
    })
};

const transactionRepository = {
    list,
};

export default transactionRepository;
