import { IProduct } from "./ProductInterfaces"

export interface IMedia extends ICreateMedia {
    id: number
}

export interface ICreateMedia {
    productId: number
    url: string
    product?: IProduct
}

export interface IUpdateMedia extends Partial<ICreateMedia> {}