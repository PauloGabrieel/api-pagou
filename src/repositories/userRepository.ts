import { prisma } from "../config/database"
import { User } from "@prisma/client"

async function create({ name, email, password}: UserCreation) {
    await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })
}
async function findByEmail(email: string) {
    return prisma.user.findFirst({
        where: {
            email
        }
    })
}
export type UserCreation = Omit<User, "createdAt" | "id" | "updatedAt">
export const userRepository = {
    create, 
    findByEmail
}