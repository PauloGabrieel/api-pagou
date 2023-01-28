import { prisma } from "../../src/config/database";

export function invalidBody() {
    return {
        name: "paulo",
        email: "paulo@hotmail.com"
    }
};

export  function genereteValidBody() {
    return {
        name: "paulo",
        email: "paulo@hotmail.com",
        password: "123456"
    }
} 

export  async function createUser() {
    const body =  genereteValidBody();
    return prisma.user.create({
        data: body
    });
};