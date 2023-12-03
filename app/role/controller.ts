import { NextFunction, Response } from "express"
import { IRoleService, RoleService } from "./service";
import { IRequest } from "../interfaces/ExpressInterfaces";
import { RoleEnum } from "./enum";

export interface IRoleController {
    
    getRoles(req: IRequest, res: Response, next: NextFunction): any
    assignRole(req: IRequest, res: Response, next: NextFunction): any
    unassignRole(req: IRequest, res: Response, next: NextFunction): any

}

export class RoleController implements IRoleController {

    private _service: IRoleService

    constructor(service = new RoleService()) {
        this._service = service
    }

    public async getRoles(req: IRequest, res: Response, next: NextFunction) {
        try {
            res.json(await this._service.getRoles())
        } catch (error) {
            next(error)
        }
    }

    public async assignRole(req: IRequest, res: Response, next: NextFunction) {
        const { role, userId }: { role: RoleEnum, userId: number } = req.body

        try {
            res.json(await this._service.assignRole(userId, role))
        } catch (error) {
            next(error)
        }
    }

    public async unassignRole(req: IRequest, res: Response, next: NextFunction) {
        const { role, userId }: { role: RoleEnum, userId: number } = req.body

        try {
            res.json(await this._service.unassignRole(userId, role))
        } catch (error) {
            next(error)
        }
    }

}