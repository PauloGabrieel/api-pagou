import bcrypt from "bcrypt";
import { UserCreation,userRepository } from "../repositories/userRepository";
import { duplicatedEmailError } from "../errors/duplicateEmailError";

async function create({name, email, password}: UserCreation) {
    await emailAlready(email);
    
    password = await hashPassword(password);

    await userRepository.create({name, email, password })
};

async function emailAlready(email: string){
    const user = await userRepository.findByEmail(email);

    if(user) {
        throw duplicatedEmailError();
    }
};

async function hashPassword(password: string) {
    const hash = 12;
    return bcrypt.hash(password, hash);

};
export const userService = {
    create
}
