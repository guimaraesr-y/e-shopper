import { PrismaClient } from "@prisma/client"
import { ICreateMedia, IMedia } from "../interfaces/MediaInterfaces"

export interface IMediaRepository {

    getMediaById(id: number): Promise<IMedia | null>
    getMediasByProductId(productId: number): Promise<IMedia[]>
    createMedia(productId: number, data: ICreateMedia): Promise<IMedia>
    deleteMedia(id: number): Promise<IMedia>

}

export class MediaRepository implements IMediaRepository {

    private _prisma: PrismaClient

    constructor(prisma = new PrismaClient()) {
        this._prisma = prisma
    }

    public async getMediaById(id: number): Promise<IMedia | null> {
        return await this._prisma.media.findUnique({ where: { id } })
    }

    public async getMediasByProductId(productId: number): Promise<IMedia[]> {
        return await this._prisma.media.findMany({ where: { productId } })
    }

    public async createMedia(productId: number, data: ICreateMedia): Promise<IMedia> {
        return await this._prisma.media.create({ data: { productId, ...data } })
    }

    public async deleteMedia(id: number): Promise<IMedia> {
        return await this._prisma.media.delete({ where: { id } })
    }

}