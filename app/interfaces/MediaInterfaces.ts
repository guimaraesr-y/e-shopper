import { IProduct } from "./ProductInterfaces"

export interface IMedia extends ICreateMedia {
    id: number
    product?: IProduct
    productId: number
}

export interface ICreateMedia {
    url: string
}

export interface IUpdateMedia extends Partial<ICreateMedia> {}