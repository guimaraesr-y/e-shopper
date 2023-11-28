import { PrismaClient } from "@prisma/client"
import { ICreateUser, IUpdateUser, IUser } from "../interfaces/UserInterfaces"
import Hasher from "../utils/hasher";

export interface IUserRepository {

    getAllUsers(): Promise<IUser[]>
    getUser(id: number): Promise<IUser | null>
    getUserByUsername(username: string): Promise<IUser | null>
    getUserByEmail(email: string): Promise<IUser | null>
    createUser(data: ICreateUser): Promise<IUser>
    updateUser(id: number, data: IUpdateUser): Promise<IUser>
    deleteUser(id: number): Promise<IUser>

}

export class UserRepository implements IUserRepository {
    
    private _prisma: PrismaClient

    constructor(prisma = new PrismaClient()) {
        this._prisma = prisma
    }

    public async getAllUsers(): Promise<IUser[]> {
        return this._prisma.user.findMany()
    }

    public async getUser(id: number): Promise<IUser | null> {
        return this._prisma.user.findUnique({ where: { id } })
    }

    public async getUserByUsername(username: string): Promise<IUser | null> {
        return this._prisma.user.findUnique({ where: { username } })
    }


    public async getUserByEmail(email: string): Promise<IUser | null> {
        return this._prisma.user.findUnique({ where: { email } })
    }

    public async createUser(data: ICreateUser): Promise<IUser> {
        data.password = Hasher.hashPassword(data.password)
        return this._prisma.user.create({ data })
    }

    public async updateUser(id: number, data: IUpdateUser): Promise<IUser> {
        return this._prisma.user.update({ where: { id }, data })
    }

    public async deleteUser(id: number): Promise<IUser> {
        return this._prisma.user.delete({ where: { id } })
    }

}