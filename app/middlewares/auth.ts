import { NextFunction, Response } from "express";
import { IRequest } from "../interfaces/ExpressInterfaces";
import { IRole } from "../interfaces/RoleInterfaces";
import { Unauthorized } from "../errors/Unauthorized";
import Jwt from "../utils/jwt";
import { UserService } from "../user/service";

export default class AuthHandler {

    public static async checkAuth(req: IRequest, res: Response, next: NextFunction) {
        if(req.user) {
            next();
        } 
        
        if(req.cookies.token) {
            const { id }: any = Jwt.verify(req.cookies.token);
            const user = await new UserService().getUser(Number(id))
            req.user = user
            next();
        } else {
            next(new Unauthorized("You don't have permission to perform this action."));
        }
    }

    public static authorize(req: Request, res: Response, next: NextFunction, role: IRole) {
        throw new Error("Method not implemented.");
    }

    public static authorizeOwner(sourceId: number, targetId: number): boolean {
        if(sourceId === targetId) {
            return true
        } else {
            throw new Unauthorized("You don't have permission to perform this action.");
        }
    }

}