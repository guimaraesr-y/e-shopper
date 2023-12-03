import { UserService } from "../service";
import { UserDto } from "../dto";

describe("UserService - Tests", () => {
    const userService = new UserService();

    var john: UserDto;

    beforeAll(async () => {
        john = await userService.createUser({
            name: "John",
            lastName: "Roffman",
            email: "john@example.com",
            password: "test",
            username: "johnroffman",
        })
    })

    afterAll(async () => {
        const deleted = await userService.deleteUser(john.id);
        expect(deleted).toBeInstanceOf(Object)
    })

    describe("UserService tests - Updating and Returning Users", () => {

        let maria: UserDto;

        beforeAll(async () => {
            maria = await userService.createUser({
                name: "Maria",
                lastName: "Santos",
                email: "maria@example.com",
                password: "test",
                username: "mariasantos",
            })
        })

        afterAll(async () => {
            await userService.deleteUser(maria.id)
        })

        it("Should update user", () => {
            userService.updateUser(maria.id, {
                name: "Maria",
                lastName: "Santos",
                email: "maria@example.com",
                password: "test",
                username: "mariasantos",
            })
                .then(user => {
                    expect(user).toBeInstanceOf(Object)
                })
        })

        it("Should return all users", () => {
            userService.getAllUsers()
                .then(users => {
                    expect(users).toBeInstanceOf(Array)
                    if(users[0]) expect(typeof users[0].id).toBe("number")
                })
        })

        it("Should return user by id", () => {
            userService.getUser(maria.id)
                .then(user => {
                    expect(user).toBeInstanceOf(Object)
                    expect(typeof user.id).toBe("number");
                })
        })

        it("Should return user by username", () => {
            userService.getUserByUsername(maria.username)
                .then(user => {
                    expect(user).toBeInstanceOf(Object)
                    expect(typeof user.id).toBe("number");
                })
        })

        it("Should return user by email", () => {
            userService.getUserByEmail(maria.email)
                .then(user => {
                    expect(user).toBeInstanceOf(Object)
                    expect(typeof user.id).toBe("number");
                })
        })
        
        it("Should return user by email", () => {
            userService.getUserByEmail(maria.email)
                .then(user => {
                    expect(user).toBeInstanceOf(Object)
                    expect(typeof user.id).toBe("number");
                })
        })
    })
})