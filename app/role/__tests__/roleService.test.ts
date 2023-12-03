import { IRole } from "../../interfaces/RoleInterfaces";
import { UserDto } from "../../user/dto";
import { UserService } from "../../user/service";
import { RoleEnum } from "../enum";
import { RoleService } from "../service";

describe('RoleService - Correct tests', () => {

    const roleService = new RoleService();
    const userService = new UserService(undefined, roleService);
    let user: UserDto;

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

    it('Should return all roles', () => {
        roleService.getRoles()
            .then((roles: IRole[]) => {
                expect(roles).toBeInstanceOf(Array)
            })
    })

    it('Should assign role to a new user', () => {
        roleService.assignRole(user.id, RoleEnum.Admin)
            .then((roles: IRole[]) => {
                expect(roles).toBeInstanceOf(Array)
            })
    })

    it('Should remove role from a user', () => {
        roleService.unassignRole(user.id, RoleEnum.User)
            .then((roles: IRole[]) => {
                expect(roles).toBeInstanceOf(Array)
            })
    })

    it('Should return user roles', () => {
        roleService.getUserRoles(user.id)
            .then((roles: IRole[]) => {
                expect(roles).toBeInstanceOf(Array)
            })
    })

})

describe('RoleService - Incorrect tests', () => {

    const roleService = new RoleService();


    // reimplementar isso aqui
    it('Should not return user roles', () => {
        roleService.getUserRoles(99999)
            .then((roles: IRole[]) => {
                expect(roles).toBeInstanceOf(Array)
                expect(roles.length).toBe(0)
            })
    })
})