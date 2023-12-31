import { PrismaClient } from "@prisma/client"
import { ICreateUser, ILoginUser, IUpdateUser, IUser } from "../interfaces/UserInterfaces"
import { IUserRepository, UserRepository } from "./repository";
import { NotFound } from "../errors/NotFound";
import { Conflict } from "../errors/Conflict";
import { UserDto } from "./dto";
import { BadRequest } from "../errors/BadRequest";
import Jwt from "../utils/jwt";
import Hasher from "../utils/hasher";
import { IRoleService, RoleService } from "../role/service";
import { RoleEnum } from "../role/enum";
import { Unauthorized } from "../errors/Unauthorized";

const prisma = new PrismaClient();

export interface IUserService {

    getAllUsers(): Promise<UserDto[]>
    getUser(id: number): Promise<UserDto | null>
    getUserByUsername(username: string): Promise<UserDto | null>
    getUserByEmail(email: string): Promise<UserDto | null>
    createUser(data: ICreateUser): Promise<UserDto>
    updateUser(userId: number, id: number, data: IUpdateUser): Promise<UserDto>
    deleteUser(userId: number, id: number): Promise<UserDto>
    login(data: ILoginUser): Promise<string>

}

export class UserService implements IUserService {

    private _repository: IUserRepository
    
    private _roleService: IRoleService

    constructor(repository = new UserRepository(prisma), roleService = new RoleService()) {
        this._repository = repository
        this._roleService = roleService
    }

    public async getAllUsers(): Promise<UserDto[]> {
        let users = await this._repository.getAllUsers()
        return users;
    }
    
    public async getUser(id: number): Promise<UserDto> {
        const user = await this._repository.getUser(id)
        if(!user) throw new NotFound("User not found");

        return UserDto.parse(user);
    }
    
    public async getUserByUsername(username: string): Promise<UserDto> {
        const user = await this._repository.getUserByUsername(username)
        if(!user) throw new NotFound("User not found");

        return user;
    }
    
    public async getUserByEmail(email: string): Promise<UserDto> {
        const user = await this._repository.getUserByEmail(email)
        if(!user) throw new NotFound("User not found");

        return user;
    }
    
    public async createUser(data: ICreateUser): Promise<UserDto> {
        if(await this._repository.getUserByEmail(data.email)) throw new Conflict("Email already exists");
        if(await this._repository.getUserByUsername(data.username)) throw new Conflict("Username already exists");

        const user = UserDto.parse(await this._repository.createUser(data));
        this._roleService.assignRole(user.id, RoleEnum.User);
        
        return user;
    }
    
    public async updateUser(userId: number, id: number, data: IUpdateUser): Promise<UserDto> { // implementar validação?
        const user = await this._repository.getUser(id);
        if(!user) throw new NotFound("User not found");

        if(data.username && data.username !== user.username)
            if(await this._repository.getUserByUsername(data.username)) throw new Conflict("Username already exists");
            
        if(data.email && data.email !== user.email)
            if(await this._repository.getUserByEmail(data.email)) throw new Conflict("Email already exists");

        return await this._repository.updateUser(id, data)
    }

    public async deleteUser(userId: number, id: number): Promise<UserDto> {
        const user = await this._repository.getUser(id)

        if(user && user.id !== userId) throw new Unauthorized("You are not authorized to access this user");
        if(!user) throw new NotFound("User not found");

        return await this._repository.deleteUser(id);
    }

    public async login(data: ILoginUser): Promise<string> {
        let user: IUser | null;

        if(data.email) {
            user = await this._repository.getUserByEmail(data.email) 
        } else if(data.username) {
            user = await this._repository.getUserByUsername(data.username)
        } else {
            throw new BadRequest("Missing username or email");
        }

        if(!user) throw new NotFound("User not found");

        if(!Hasher.comparePassword(data.password, user.password))
            throw new NotFound("Invalid credentials");

        return Jwt.sign({ id: user.id });
    }

}