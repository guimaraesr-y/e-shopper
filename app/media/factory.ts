import { PrismaClient } from "@prisma/client";
import Database from "../utils/database";
import { IMediaService, MediaService } from "./service";
import { MediaRepository } from "./repository";

export default class MediaFactory {

    private static _prisma: PrismaClient = Database.getInstance();

    public static get service(): IMediaService {
        const productRepository = new MediaRepository(MediaFactory._prisma);
        return new MediaService(productRepository);
    }

}