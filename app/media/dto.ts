import { ICreateMedia, IMedia } from "../interfaces/MediaInterfaces"

export default class MediaDto implements IMedia {
    public id: number
    public productId: number
    public url: string

    constructor(media: IMedia) {
        const { id, productId, url } = media

        this.id = id
        this.productId = productId
        this.url = url
    }

    public static createFromFile(file: Express.Multer.File): ICreateMedia {
        const url = file.path.toString().replace('public', '')
        console.log(url)
        return { url }
    }

    public getPath() {
        return 'public' + this.url
    }
}