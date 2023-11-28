import { PrismaClient } from "@prisma/client";
import { UserRepository } from "./repository";
import { UserService } from "./service";
import { UserController } from "./controller";
import { Router } from "express";
import UserRouter from "./router";
import Database from "../utils/database";

export default class UserFactory {

    private static _prisma: PrismaClient = Database.getInstance();

    public static get userRouter(): Router {
        const userRepository = new UserRepository(UserFactory._prisma);
        const userService = new UserService(userRepository);
        const userController = new UserController(userService);
        const userRouter = new UserRouter(Router(), userController);

        return userRouter.router;
    }

}