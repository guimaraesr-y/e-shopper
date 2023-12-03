import { PrismaClient } from "@prisma/client";
import { UserRepository } from "./repository";
import { UserService } from "./service";
import { UserController } from "./controller";
import { Router } from "express";
import UserRouter from "./router";
import Database from "../utils/database";
import RoleFactory from "../role/factory";

export default class UserFactory {

    private static _prisma: PrismaClient = Database.getInstance();

    public static get service(): UserService {
        const userRepository = new UserRepository(UserFactory._prisma);
        return new UserService(userRepository, RoleFactory.service);
    }

    public static get userRouter(): Router {
        const userService = UserFactory.service
        const userController = new UserController(userService);
        const userRouter = new UserRouter(Router(), userController);
        
        return userRouter.router;
    }

}