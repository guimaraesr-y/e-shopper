import { RoleEnum } from "../role/enum"
import { IUser } from "./UserInterfaces"

export interface IRole extends ICreateRole {
    id: number
}

export interface ICreateRole {
    name: RoleEnum
}

export interface IUpdateRole extends Partial<ICreateRole> {}