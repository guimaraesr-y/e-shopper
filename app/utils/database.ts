import { PrismaClient, Prisma } from "@prisma/client";

export default class Database {

    private static _prisma: PrismaClient = new PrismaClient();

    public static getInstance(): PrismaClient {
        return this._prisma;
    }

}