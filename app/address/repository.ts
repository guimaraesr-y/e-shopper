import { PrismaClient } from "@prisma/client"
import { IAddress, ICreateAddress, IUpdateAddress } from "../interfaces/AddressInterfaces"

export interface IAddressRepository {

    getAddresses(userId: number): Promise<IAddress[]>
    getAddressById(id: number): Promise<IAddress | null>
    storeAddress(userId: number, data: ICreateAddress): Promise<IAddress>
    deleteAddress(id: number): Promise<IAddress>
    updateAddress(id: number, data: IUpdateAddress): Promise<IAddress>

}

export class AddressRepository implements IAddressRepository {

    private _prisma: PrismaClient

    constructor(prisma = new PrismaClient()) {
        this._prisma = prisma    
    }
    
    public async getAddresses(userId: number): Promise<IAddress[]> {
        return await this._prisma.address.findMany({
            where: {
                userId
            }
        })
    }

    public async getAddressById(id: number): Promise<IAddress | null> {
        return await this._prisma.address.findUnique({ where: { id } })
    }

    public async storeAddress(userId: number, data: ICreateAddress): Promise<IAddress> {
        return await this._prisma.address.create({ 
            data: {
                ...data,
                userId
            }
        })
    }

    async deleteAddress(id: number): Promise<IAddress> {
        return await this._prisma.address.delete({ where: { id } })
    }

    public async updateAddress(id: number, data: ICreateAddress): Promise<IAddress> {
        return await this._prisma.address.update({ where: { id }, data })
    }

}