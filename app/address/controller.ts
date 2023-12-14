import { NextFunction, Response } from "express"
import { IRequest } from "../interfaces/ExpressInterfaces";
import { AddressService, IAddressService } from "./service";
import { IAddress, ICreateAddress, IUpdateAddress } from "../interfaces/AddressInterfaces";
import { Unauthorized } from "../errors/Unauthorized";

export interface IAddressController {
    
    getAddresses(req: IRequest, res: Response, next: NextFunction): any
    getAddressById(req: IRequest, res: Response, next: NextFunction): any
    create(req: IRequest, res: Response, next: NextFunction): any
    update(req: IRequest, res: Response, next: NextFunction): any
    delete(req: IRequest, res: Response, next: NextFunction): any

}

export class AddressController implements IAddressController {

    private _service: IAddressService

    constructor(service = new AddressService()) {
        this._service = service
    }

    public async getAddresses(req: IRequest, res: Response, next: NextFunction) {
        const { id } = req.user!;

        try {
            res.json(await this._service.getAddresses(id))
        } catch (error) {
            next(error)
        }
    }

    public async getAddressById(req: IRequest, res: Response<any, Record<string, any>>, next: NextFunction) {
        const { id } = req.user!;
        const addressId = req.params.id;

        try {
            res.json(await this._service.getAddressById(id, Number(addressId)))
        } catch (error) {
            next(error)
        }
    }

    public async create(req: IRequest, res: Response, next: NextFunction) {
        const { id } = req.user!;
        const data = req.body as ICreateAddress;

        try {
            res.json(await this._service.storeAddress(id, data))
        } catch (error) {
            next(error)
        }
    }

    public async update(req: IRequest, res: Response, next: NextFunction) {
        const { id } = req.user!;
        const addressId = req.params.id;
        const data = req.body as IUpdateAddress;

        try {
            res.json(await this._service.updateAddress(id, Number(addressId), data))
        } catch (error) {
            next(error)
        }
    }

    public async delete(req: IRequest, res: Response, next: NextFunction) {
        const { id } = req.user!;
        const addressId = req.params.id
        
        try {
            res.json(await this._service.deleteAddress(id, Number(addressId)))
        } catch (error) {
            next(error)
        }
    }

}