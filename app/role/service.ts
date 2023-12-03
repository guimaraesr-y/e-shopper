import { PrismaClient } from "@prisma/client"
import { IRoleRepository, RoleRepository } from "./repository"
import { IRole } from "../interfaces/RoleInterfaces"
import { RoleEnum } from "./enum"
import { NotFound } from "../errors/NotFound"

const prisma = new PrismaClient()

export interface IRoleService {

    getRoles(): Promise<IRole[]>
    getRole(id: number): Promise<IRole>
    getUserRoles(id: number): Promise<IRole[]>
    getRoleByName(name: string): Promise<IRole>
    assignRole(userId: number, role: RoleEnum): Promise<IRole[]>
    unassignRole(userId: number, role: RoleEnum): Promise<IRole[]>

}

export class RoleService implements IRoleService {

    private _repository: IRoleRepository

    constructor(repository = new RoleRepository(prisma)) {
        this._repository = repository
    }

    public async getRoles(): Promise<IRole[]> {
        return await this._repository.getRoles()
    }
    
    public async getRole(id: number): Promise<IRole> {
        const role = await this._repository.getRole(id)
        if(!role) throw new NotFound("Role not found")

        return role;
    }

    public async getUserRoles(id: number): Promise<IRole[]> {
        return await this._repository.getUserRoles(id)
    }
    
    public async getRoleByName(name: string): Promise<IRole> {
        const role = await this._repository.getRoleByName(name)
        if(!role) throw new NotFound("Role not found")

        return role;
    }
    
    public async assignRole(userId: number, role: RoleEnum): Promise<IRole[]> {
        await this._repository.assignRole(userId, role)
        return await this._repository.getUserRoles(userId)
    }
    
    public async unassignRole(userId: number, role: RoleEnum): Promise<IRole[]> {
        await this._repository.unassignRole(userId, role)
        return await this._repository.getUserRoles(userId)
    }

}