import { Router } from "express";
import AuthHandler from "../middlewares/auth";
import { AddressController, IAddressController } from "./controller";
import { RoleEnum } from "../role/enum";
import { RoleDto } from "../role/dto";

export default class AddressRouter {
    
    private _router: Router;
    private _controller: IAddressController;

    constructor(router = Router(), controller = new AddressController()) {
        this._router = router;
        this._controller = controller;

        const adminAuthorizer = AuthHandler
            .authorize(RoleDto.convertRoleEnumToIRole(RoleEnum.Admin));

        this.router.use(AuthHandler.checkAuth);
        
        this._router.get('/', (req, res, next) => this._controller.getAddresses(req, res, next));
        this._router.get('/:id', (req, res, next) => this._controller.getAddressById(req, res, next));
        this._router.post('/', (req, res, next) => this._controller.create(req, res, next));
        this._router.put('/:id', (req, res, next) => this._controller.update(req, res, next));
        this._router.delete('/:id', (req, res, next) => this._controller.delete(req, res, next));
    } 

    get router(): Router {
        return this._router;
    }

}