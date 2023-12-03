import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import Database from "../utils/database";
import { RoleRepository } from "./repository";
import { RoleService } from "./service";
import { RoleController } from "./controller";
import RoleRouter from "./router";

export default class RoleFactory {

    private static _prisma: PrismaClient = Database.getInstance();

    public static get service(): RoleService {
        const roleRepository = new RoleRepository(RoleFactory._prisma);
        return new RoleService(roleRepository);
    }

    public static get roleRouter(): Router {
        const roleService = RoleFactory.service
        const roleController = new RoleController(roleService);
        const roleRouter = new RoleRouter(Router(), roleController);

        return roleRouter.router;
    }

}