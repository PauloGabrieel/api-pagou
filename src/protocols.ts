import { User, Session, Transaction } from "@prisma/client"

export type ApplicationError = {
    name: string,
    message: string
};

export type UserParams = Pick<User, "email" | "password">;

export type CreateUserParams = Omit<User, "id"| "updatedAt" | "createdAt">;

export type CreateTransactionsParams = Omit<Transaction, "id" | "createdAt" | "updatedAt">

export type SessionParams = Pick<Session, "token" | "userId">;

export type SigninResult = {
    name: string,
    email: string,
    token: string
}