import { NotFound } from "../errors/NotFound";
import { Unauthorized } from "../errors/Unauthorized";
import { IAddress, ICreateAddress, IUpdateAddress } from "../interfaces/AddressInterfaces";
import { AddressRepository, IAddressRepository } from "./repository";

export interface IAddressService {

    getAddresses(userId: number): Promise<IAddress[]>;
    getAddressById(userId: number, id: number): Promise<IAddress>;
    storeAddress(userId: number, data: ICreateAddress): Promise<IAddress>
    deleteAddress(userId: number, id: number): Promise<IAddress>
    updateAddress(userId: number, id: number, data: IUpdateAddress): Promise<IAddress>

}

export class AddressService implements IAddressService {

    private _repository: IAddressRepository;

    constructor(repository = new AddressRepository()) {
        this._repository = repository;
    }

    public async getAddressById(userId: number, id: number): Promise<IAddress> {
        const address = await this._repository.getAddressById(id);
        if(!address) {
            throw new NotFound("Address not found");
        }

        if(address.userId !== userId) {
            throw new Unauthorized("You are not authorized to access this address");
        }

        return address;
    }

    public async getAddresses(userId: number): Promise<IAddress[]> {
        return await this._repository.getAddresses(userId);
    }

    public async storeAddress(userId: number, data: ICreateAddress): Promise<IAddress> {
        return await this._repository.storeAddress(userId, data);
    }
    
    public async deleteAddress(userId: number, id: number): Promise<IAddress> {
        const address = await this._repository.getAddressById(id);
        if(!address) {
            throw new NotFound("Address not found");
        }

        if(address.userId !== userId) {
            throw new Unauthorized("You are not authorized to access this address");
        }

        return await this._repository.deleteAddress(id);
    }
    
    public async updateAddress(userId: number, id: number, data: IUpdateAddress): Promise<IAddress> {
        const address = await this.getAddressById(userId, id);
        if(!address) {
            throw new NotFound("Address not found");
        }

        if(address.userId !== userId) {
            throw new Unauthorized("You are not authorized to access this address");
        }

        return this._repository.updateAddress(id, data);
    }
    

}