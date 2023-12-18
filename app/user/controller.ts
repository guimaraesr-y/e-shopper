import { NextFunction, Request, Response } from "express"
import { IUserService, UserService } from "./service"
import { ICreateUser, ILoginUser, IUpdateUser } from "../interfaces/UserInterfaces"
import { BadRequest } from "../errors/BadRequest"
import { IRequest } from "../interfaces/ExpressInterfaces"

export interface IUserController {
    
    getAllUsers(req: Request, res: Response, next: NextFunction): any
    getUser(req: Request, res: Response, next: NextFunction): any
    getUserByUsername(req: Request, res: Response, next: NextFunction): any
    createUser(req: Request, res: Response, next: NextFunction): any
    updateUser(req: Request, res: Response, next: NextFunction): any
    deleteUser(req: Request, res: Response, next: NextFunction): any
    login(req: Request, res: Response, next: NextFunction): any

}

export class UserController implements IUserController {

    private _service: IUserService

    constructor(service = new UserService()) {
        this._service = service
    }

    public async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this._service.getAllUsers();
            res.json(users)
        } catch (error) {
            next(error)
        }
    }

    public async getUser(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params

        try {
            const userId = Number(id)
            if(!userId) throw new BadRequest("ID must be a number");

            const user = await this._service.getUser(Number(userId))
            res.json(user);
        } catch (error) {
            next(error)
        }
    }

    public async getUserByUsername(req: Request, res: Response, next: NextFunction) {
        const { username } = req.params

        try {
            const user = await this._service.getUserByUsername(username)
            res.json(user);
        } catch (error) {
            next(error)
        }
    }
    
    public async createUser(req: Request, res: Response, next: NextFunction) {
        const { body }: { body: ICreateUser } = req

        try {
            const user = await this._service.createUser(body)
            res.status(201).json(user);
        } catch (error) {
            next(error)
        }
    }

    public async updateUser(req: IRequest, res: Response, next: NextFunction) {
        const { id } = req.params
        const { body }: { body: IUpdateUser } = req
        const userId = req.user!.id

        console.log('body:', body)

        try {
            const user = await this._service.updateUser(userId, Number(id), body)
            res.json(user);
        } catch (error) {
            next(error)
        }
    }

    public async deleteUser(req: IRequest, res: Response, next: NextFunction) {
        const { id } = req.params
        const userId = req.user!.id
        
        try {
            const user = await this._service.deleteUser(userId, Number(id))
            res.json(user);
        } catch (error) {
            next(error)
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        const { body } = req as { body: ILoginUser }

        try {
            const token = await this._service.login(body)
            res.cookie("token", token).json({ token });
        } catch (error) {
            next(error)
        }
    }

}