import { Decimal } from "@prisma/client/runtime/library"
import { IMedia } from "./MediaInterfaces"
import { ISale } from "./SaleInterfaces"
import { IUser } from "./UserInterfaces"

export interface IProduct extends ICreateProduct {
    id: number
    ownerId: number
    owner?: IUser
    sales?: ISale[]
    media?: IMedia[]
}

export interface ICreateProduct {
    title: string
    description: string
    price: Decimal
}

export interface IUpdateProduct extends Partial<ICreateProduct> {}