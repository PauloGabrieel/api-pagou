import app, { init } from "../../src/app";
import { invalidBody, generateValidBodyToSignUp, createUser } from "../factories/userFactory";
import { cleanDb, generateValidTokenWithoutSession, generateValidToken } from "../helpers";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";



beforeAll(async () => {
    await init();
    
});

beforeEach( async () => {
    await cleanDb();
});

const server = supertest(app);

describe("GET /transactions", ()=> {
    it("should respond with status 401 if no token is given", async()=> {
        const response = await server.get("/transactions");

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if given token is not valid", async ()=> {
        const token = faker.lorem.word();
        const response = await server.get("/transactions").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    
    it("should respond with status 401 if there is no session for given token", async ()=> {
        const userWithoutSession = await createUser();
        const token = generateValidTokenWithoutSession(userWithoutSession.id);
        const response = await server.get("/transactions").set("Authorization", `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe("when token is valid", ()=> {
        it("should respond with status 200 and empty array when there are no transactions created", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const response = await server.get("/transactions").set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toEqual([]);
        });
    });
});
