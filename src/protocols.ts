import { User, Session } from "@prisma/client"

export type ApplicationError = {
    name: string,
    message: string
};

export type UserParams = Pick<User, "email" | "password">;

export type CreateUserParams = Omit<User, "id"| "updatedAt" | "createdAt">;

export type SessionParams = Pick<Session, "token" | "userId">;

export type SigninResult = {
user: Pick<User,"name" | "email">,
    token: string
}