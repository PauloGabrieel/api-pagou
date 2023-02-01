import { prisma } from "../../src/config/database";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

export function invalidBody() {
    return {
        name: faker.name.fullName()
    }
};

export function generateValidBodyToSignUp() {
    return {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(6)
    }
} 

export  async function createUser(params: Partial<User> = {} ) {
    const incomingPassword = params.password;
    const hashPassword = await bcrypt.hash(incomingPassword,12);

    return prisma.user.create({
        data: {
            email: params.email,
            name: params.name,
            password: hashPassword
        }
    })
};