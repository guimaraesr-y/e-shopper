import { IUser } from "./UserInterfaces"

export interface IAddress extends ICreateAddress {
    id: number
    userId: number
    user?: IUser
}

export interface ICreateAddress {
    title: string
    addressLine: string
    number: string
    complement: string
}

export interface IUpdateAddress extends Partial<ICreateAddress> {}