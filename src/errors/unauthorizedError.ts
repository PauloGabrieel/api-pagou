import { ApplicationError } from "../protocols";

export default function unauthorizadeError (message: string): ApplicationError {
    return {
        name: "UnauthorizedError",
        message
    }
}