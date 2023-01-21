import { ApplicationError } from "../protocols";

export default function unauthorizadeError (messsage: string): ApplicationError {
    return {
        name: "UnauthorizedError",
        messsage
    }
}