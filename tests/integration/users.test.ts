import supertest from "supertest";
import httpStatus from "http-status";
import app from "../../src";
import { invalidBody, createUser, genereteValidBody } from "../factories/userFactory";
import { cleanDb } from "../helpers";
import { prisma } from "../../src/config/database";
import exp from "constants";

const server = supertest(app);

beforeEach(async () => {
    await cleanDb();
});

describe("POST /signup", () => {
    it("should respond with status 400 when body is not given", async () => {
        const response = await server.post("/signup");
        
        expect(response.status).toBe(httpStatus.BAD_REQUEST)
    });
    
    it("should respond with status 400 when body is not valid", async () => {
        const body = invalidBody();
        const response = await server.post("/signup").send(body);
        
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe("when body is valid", () => {
        it("should respond with status 409 when there is an user with given email", async() => {
            const user = await createUser();
            const bodyWithSameEmail = {
                name: user.name,
                email: user.email,
                password: "123456"
            };
        
            const response = await server.post("/signup").send(bodyWithSameEmail);

            expect(response.status).toBe(httpStatus.CONFLICT);
        });

        it("should respond with status 201 and create user when email is unique",async () => {
            const body = genereteValidBody();
            const response = await server.post("/signup").send(body);
            const user = await prisma.user.findFirst({
                where: {
                    email: body.email
                }
            })

            expect(response.status).toBe(httpStatus.CREATED);
            expect(user.email).toEqual(body.email);
        })
    });
})
