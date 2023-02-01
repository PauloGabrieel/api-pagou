import app, { init } from "../../src/app";
import { invalidBody, generateValidBodyToSignUp, createUser } from "../factories/userFactory";
import { cleanDb } from "../helpers";
import { generateValidBodyToSignIn } from "../factories/authenticationFactory";
import supertest from "supertest";
import httpStatus from "http-status";
import { prisma } from "../../src/config/database";

beforeAll(async () => {
    await init();
    
});

afterAll( async () => {
    await cleanDb();
});

const server = supertest(app);

describe("POST /signin", ()=> {
    it("should respond with status 400 when body is not given",async () => {
        const response = await server.post("/signin");
        
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 when body is not valid",async () => {
        const body = invalidBody();
        const response = await server.post("/signin").send(body);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe("when body is valid", () => {
        it("should respond with status 401 if there is no user for the given email", async () => {
            const body = generateValidBodyToSignIn();
            const response = await server.post("/signin").send(body);

            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });
        
        it("should respond with status 401 if there is a user for the given email but password is not correct", async () => {
            const body = generateValidBodyToSignUp();
            const user = await createUser(body);
            
            const userWithWrongPassword = {
                email: user.email,
                password: "123456"
            };
            const response = await server.post("/signin").send(userWithWrongPassword); 

            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });

        describe("when crendentials are valid", () => {
            it("Should respond with status 200,user data and session token", async () => {
                const body = generateValidBodyToSignUp();
                const user = await createUser(body);
                
                const response = await server.post("/signin").send({
                    email: user.email, 
                    password: body.password
                });

                const { token } = await prisma.session.findFirst({
                    select: {token: true},
                    where: {
                        userId: user.id
                    }
                });
                expect(response.status).toBe(httpStatus.OK);
                expect(response.body).toEqual({
                    user: {
                        name: user.name,
                        email: user.email
                    },
                    token: token 
                });
            })
        })
    })

})