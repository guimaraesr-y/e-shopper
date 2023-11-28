import { Decimal } from "@prisma/client/runtime/library"
import { IMedia } from "./MediaInterfaces"
import { ISale } from "./SaleInterfaces"
import { IUser } from "./UserInterfaces"

export interface IProduct extends ICreateProduct {
    id: number
}

export interface ICreateProduct {
    ownerId: number
    title: string
    description: string
    price: Decimal
    owner?: IUser
    media?: IMedia[]
    sales?: ISale[]
}

export interface IUpdateProduct extends Partial<ICreateProduct> {}