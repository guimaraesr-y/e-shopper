import { UserService } from "../service";
import { UserDto } from "../dto";

describe("UserService - Correct Tests", () => {
    const userService = new UserService();
    
    describe("UserService tests - Create and Delete Users", () => {
        var user: UserDto;

        it("Should create user", async() => {
            user = await userService.createUser({
                name: "test",
                lastName: "tester",
                email: "test1@example.com",
                password: "test",
                username: "test1",
            })

            expect(user).toBeInstanceOf(Object)
        })

        it("Should delete user", () => {
            userService.deleteUser(user.id)
                .then(user => {
                    expect(user).toBeInstanceOf(Object)
                })
        })
    })

    describe("UserService tests - Updating and Returning Users", () => {
        let user: UserDto

        beforeAll(async () => {
            user = await userService.createUser({
                name: "test",
                lastName: "tester",
                email: "test@example.com",
                password: "test",
                username: "test",
            })
        })
        
        afterAll(async () => {
            await userService.deleteUser(user.id);
        })

        it("Should update user", () => {
            userService.updateUser(user.id, {
                name: "test",
                lastName: "tester",
                email: "test2@example.com",
                password: "test",
                username: "test2",
            })
                .then(user => {
                    expect(user).toBeInstanceOf(Object)
                })
        })

        it("Should return all users", () => {
            userService.getAllUsers()
                .then(users => {
                    console.log(users)
                    expect(users).toBeInstanceOf(Array)
                    if(users[0]) expect(users[0].id).toBeInstanceOf(Number)
                })
        })

        it("Should return user by id", () => {
            userService.getUser(user.id)
                .then(user => {
                    expect(user).toBeInstanceOf(Object)
                    expect(user.id).toBeInstanceOf(Number)
                })
        })

        it("Should return user by username", () => {
            userService.getUserByUsername(user.username)
                .then(user => {
                    expect(user).toBeInstanceOf(Object)
                    expect(user.id).toBeInstanceOf(Number)
                })
        })

        it("Should return user by email", () => {
            userService.getUserByEmail(user.email)
                .then(user => {
                    expect(user).toBeInstanceOf(Object)
                    expect(user.id).toBeInstanceOf(Number)
                })
        })
        
        it("Should return user by email", () => {
            userService.getUserByEmail(user.email)
                .then(user => {
                    expect(user).toBeInstanceOf(Object)
                    expect(user.id).toBeInstanceOf(Number)
                })
        })
    })
})

