import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";

export function generateValidBodyToSignIn() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(6),
    };
};
