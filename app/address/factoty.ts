import { PrismaClient } from "@prisma/client"
import Database from "../utils/database"
import { Router } from "express"
import { AddressService } from "./service"
import { AddressRepository } from "./repository"
import { AddressController } from "./controller"
import AddressRouter from "./router"

export default class AddressFactory {

    private static _prisma: PrismaClient = Database.getInstance()

    public static get service(): AddressService {
        const addressRepository = new AddressRepository(this._prisma)
        return new AddressService(addressRepository)
    }

    public static get addressRouter(): Router {
        const addressService = AddressFactory.service
        const addressController = new AddressController(addressService)
        const addressRouter = new AddressRouter(Router(), addressController)

        return addressRouter.router
    }

}