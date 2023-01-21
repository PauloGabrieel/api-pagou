import { UserCreation,userRepository } from "../repositories/userRepository"

async function create({name, email, password}: UserCreation) {
    await userRepository.create({name, email, password })
}

export const userService = {
    create
}
