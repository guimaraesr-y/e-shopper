import { Router } from "express";
import { RoleController } from "./controller";
import AuthHandler from "../middlewares/auth";
import { RoleEnum } from "./enum";
import { RoleDto } from "./dto";

export default class RoleRouter {
    
    private _router: Router;
    private _controller: RoleController;

    constructor(router = Router(), controller = new RoleController()) {
        this._router = router;
        this._controller = controller;
        const adminAuthorizer = AuthHandler
            .authorize(RoleDto.convertRoleEnumToIRole(RoleEnum.Admin));
        
        this._router.get('/', (req, res, next) => this._controller.getRoles(req, res, next));
        this._router.post('/assign', adminAuthorizer, (req, res, next) => this._controller.assignRole(req, res, next));
        this._router.post('/unassign', adminAuthorizer, (req, res, next) => this._controller.unassignRole(req, res, next));
    } 

    get router(): Router {
        return this._router;
    }

}