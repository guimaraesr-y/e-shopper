import { PrismaClient } from "@prisma/client";
import Hasher from "../utils/hasher";

const prisma = new PrismaClient();

async function main() {

    const roles = await prisma.role.createMany({
        data: [
            { name: "admin" },
            { name: "user" },
            { name: "seller" },
        ],
    });

    const admin = await prisma.user.create({
        data: {
            name: "Ryan",
            lastName: "Guimarães",
            username: "admin",
            email: "admin@eshopper.com",
            password: Hasher.hashPassword("admin"),
            roles: {
                connect: [
                    { name: "user" },
                    { name: "admin" },
                ],
            }
        }
    })

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })