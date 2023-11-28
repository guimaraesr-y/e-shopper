import { Decimal } from "@prisma/client/runtime/library"
import { IProduct } from "./ProductInterfaces"
import { IUser } from "./UserInterfaces"

export interface ISale extends ICreateSale {
    id: number
    user?: IUser
}

export interface ICreateSale {
    discount: Decimal
    state: string
    products?: IProduct[]
}

export interface IUpdateSale extends Partial<ICreateSale> {}