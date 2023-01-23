import { ApplicationError } from "../protocols";

export function duplicatedEmailError() {
    return {
        name: "DuplicatedEmailError",
        message: "There is already an user with given email"
    }
}