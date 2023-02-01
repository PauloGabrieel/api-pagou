import { prisma } from "../../src/config/database";

export async function createSession(token: string, userId: number) {
    return prisma.session.create({
        data:{
            token,
            userId
        }
    })
}