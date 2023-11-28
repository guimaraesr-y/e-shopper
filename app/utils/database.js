"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class Database {
    static getInstance() {
        return this._prisma;
    }
}
Database._prisma = new client_1.PrismaClient();
exports.default = Database;
