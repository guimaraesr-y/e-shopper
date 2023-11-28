import { IUser } from "./UserInterfaces"

export interface IRole extends ICreateRole {
    id: number
}

export interface ICreateRole {
    name: string
}

export interface IUpdateRole extends Partial<ICreateRole> {}