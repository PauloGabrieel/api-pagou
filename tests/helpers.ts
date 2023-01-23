import { prisma } from "../src/config/database";

export async function cleanDb(){
    await prisma.session.deleteMany();
    await prisma.payable.deleteMany();
    await prisma.transaction.deleteMany();
    await prisma.user.deleteMany();
};