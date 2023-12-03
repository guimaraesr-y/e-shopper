import { PrismaClient } from "@prisma/client"
import { IRole } from "../interfaces/RoleInterfaces"
import { RoleEnum } from "./enum"

export interface IRoleRepository {

    getRoles(): Promise<IRole[]>
    getRole(id: number): Promise<IRole | null>
    getUserRoles(id: number): Promise<IRole[]>
    getRoleByName(name: string): Promise<IRole | null>
    assignRole(userId: number, role: RoleEnum): Promise<IRole>
    unassignRole(userId: number, role: RoleEnum): Promise<IRole>

}

export class RoleRepository implements IRoleRepository {
    
    private _prisma: PrismaClient

    constructor(prisma = new PrismaClient()) {
        this._prisma = prisma
    }

    public async getRoles(): Promise<IRole[]> {
        let users = await this._prisma.role.findMany()
        
        return users.map(user => ({
            "id": user.id,
            "name": user.name as RoleEnum
        }))
    }
    
    public async getRole(id: number): Promise<IRole | null> {
        return await this._prisma.role.findUnique({
            where: {
                id
            }
        }) as IRole
    }

    public async getUserRoles(id: number): Promise<IRole[]> {
        const roles = await this._prisma.role.findMany({
            where: {
                users: {
                    some: { id }
                }
            }
        })

        return roles.map(role => ({
            "id": role.id,
            "name": role.name as RoleEnum
        }))
    }

    public async getRoleByName(name: string): Promise<IRole | null> {
        return await this._prisma.role.findUnique({
            where: {
                name
            }
        }) as IRole;
    }

    public async assignRole(userId: number, role: RoleEnum): Promise<IRole> {
        return await this._prisma.role.update({
            where: {
                name: role.valueOf()
            },
            data: {
                users: {
                    connect: { id: userId }
                }
            }
        }) as IRole
    }

    public async unassignRole(userId: number, role: RoleEnum): Promise<IRole> {
        return await this._prisma.role.update({
            where: {
                name: role.valueOf()
            },
            data: {
                users: {
                    disconnect: { id: userId }
                }
            }
        }) as IRole
    }

}