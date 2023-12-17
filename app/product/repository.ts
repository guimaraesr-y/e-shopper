import { PrismaClient } from "@prisma/client"
import { ICreateUser, IUpdateUser, IUser } from "../interfaces/UserInterfaces"
import Hasher from "../utils/hasher";
import { ICreateProduct, IProduct, IUpdateProduct } from "../interfaces/ProductInterfaces";

export interface IProductRepository {

    getAllProducts(): Promise<IProduct[]>
    getProductById(id: number): Promise<IProduct | null>
    getProductsByUserId(id: number): Promise<IProduct[]>
    storeProduct(userId: number, data: ICreateProduct): Promise<IProduct>
    updateProduct(id: number, data: IUpdateProduct): Promise<IProduct>
    deleteProduct(id: number): Promise<IProduct>

}

export class ProductRepository implements IProductRepository {
    
    private _prisma: PrismaClient

    constructor(prisma = new PrismaClient()) {
        this._prisma = prisma
    }

    public async getAllProducts(): Promise<IProduct[]> {
        return await this._prisma.product.findMany()
    }

    public async getProductById(id: number): Promise<IProduct | null> {
        return await this._prisma.product.findUnique({ where: { id } })
    }

    public async getProductsByUserId(id: number): Promise<IProduct[]> {
        return await this._prisma.product.findMany({ where: { ownerId: id } })
    }

    public async storeProduct(userId: number, data: ICreateProduct): Promise<IProduct> {
        return await this._prisma.product.create({ 
            data: { 
                ...data, 
                ownerId: userId,
            },
        })
    }

    public async updateProduct(id: number, data: IUpdateProduct): Promise<IProduct> {
        return await this._prisma.product.update({
            where: { id },
            data: { ...data },
        })
    }

    public async deleteProduct(id: number): Promise<IProduct> {
        return await this._prisma.product.delete({ where: { id } })
    }

    

}