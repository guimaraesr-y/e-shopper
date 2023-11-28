import { Decimal } from "@prisma/client/runtime/library"
import { IAddress } from "./AddressInterfaces"
import { ISale } from "./SaleInterfaces"
import { IRole } from "./RoleInterfaces"
import { IProduct } from "./ProductInterfaces"

export interface IUser extends ICreateUser {
    id: number
    balance: Decimal
    addresses?: IAddress[]
    sales?: ISale[]
    roles?: IRole[]
    products?: IProduct[]
    is_active: boolean
}

export interface ICreateUser {
    name: string
    lastName: string
    email: string
    password: string
    username: string
}

export interface IUpdateUser extends Partial<ICreateUser> {
    balance?: Decimal
    is_active?: boolean
}

export interface ILoginUser {
    email?: string
    username?: string
    password: string
}