import { PrismaClient } from "@prisma/client";
import { ProductRepository } from "./repository";
import { ProductService } from "./service";
import { ProductController } from "./controller";
import { Router } from "express";
import Database from "../utils/database";
import ProductRouter from "./router";

export default class ProductFactory {

    private static _prisma: PrismaClient = Database.getInstance();

    public static get service(): ProductService {
        const productRepository = new ProductRepository(ProductFactory._prisma);
        return new ProductService(productRepository);
    }

    public static get productRouter(): Router {
        const userService = ProductFactory.service
        const productController = new ProductController(userService);
        const productRouter = new ProductRouter(Router(), productController);
        
        return productRouter.router;
    }

}