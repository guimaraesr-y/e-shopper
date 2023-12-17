import { NotFound } from "../errors/NotFound"
import { Unauthorized } from "../errors/Unauthorized"
import { ICreateMedia, IMedia } from "../interfaces/MediaInterfaces"
import FileSystem from "../utils/fs"
import MediaDto from "./dto"
import { IMediaRepository, MediaRepository } from "./repository"

export interface IMediaService {

    getMediaById(id: number): Promise<IMedia>
    getMediasByProductId(productId: number): Promise<IMedia[]>
    createMedia(productId: number, data: ICreateMedia): Promise<IMedia>
    deleteProductMedia(productId: number, id: number): Promise<IMedia>
    deleteAllProductMedias(productId: number): Promise<number>

}

export class MediaService implements IMediaService {

    private _repository: IMediaRepository

    constructor(repository = new MediaRepository()) {
        this._repository = repository
    }

    public async getMediaById(id: number): Promise<IMedia> {
        const media = await this._repository.getMediaById(id)

        if(!media) throw new NotFound("Media not found")

        return media;
    }

    public async getMediasByProductId(productId: number): Promise<IMedia[]> {
        return await this._repository.getMediasByProductId(productId)
    }

    public async createMedia(productId: number, data: ICreateMedia): Promise<IMedia> {
        return await this._repository.createMedia(productId, data)
    }

    public async deleteProductMedia(productId: number, id: number): Promise<IMedia> {
        const media = await this._repository.getMediaById(id)
        
        if(!media) throw new NotFound("Media not found")
        if(media.productId !== productId) throw new Unauthorized("Media not found")

        FileSystem.deleteFile(new MediaDto(media).getPath())

        return await this._repository.deleteMedia(id)
    }

    public async deleteAllProductMedias(productId: number): Promise<number> {
        const medias = await this._repository.getMediasByProductId(productId)
        await Promise.all(medias.map(async(media) => await this.deleteProductMedia(productId, media.id)))

        return medias.length
    }

}