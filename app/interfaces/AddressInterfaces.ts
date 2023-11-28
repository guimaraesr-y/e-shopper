import { IUser } from "./UserInterfaces"

export interface IAddress extends ICreateAddress {
    id: number
    user?: IUser
}

export interface ICreateAddress {
    userId: number
    title: string
    addressLine: string
    number: string
    complement: string
}

export interface IUpdateAddress extends Partial<ICreateAddress> {}