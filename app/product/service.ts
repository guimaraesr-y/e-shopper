import { PrismaClient } from "@prisma/client"
import { IProductRepository, ProductRepository } from "./repository";
import { ProductDto } from "./dto";
import { ICreateProduct, IUpdateProduct } from "../interfaces/ProductInterfaces";
import { NotFound } from "../errors/NotFound";
import { Unauthorized } from "../errors/Unauthorized";
import { IMediaService, MediaService } from "../media/service";
import MediaDto from "../media/dto";
import { IMedia } from "../interfaces/MediaInterfaces";
import { BadRequest } from "../errors/BadRequest";

const prisma = new PrismaClient();

export interface IProductService {

    getAllProducts(): Promise<ProductDto[]>
    getProductById(id: number): Promise<ProductDto>
    getProductsByUserId(userId: number): Promise<ProductDto[]>
    createProduct(userId: number, data: ICreateProduct, files: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[]; } | undefined): Promise<ProductDto>
    updateProduct(userId: number, id: number, data: IUpdateProduct): Promise<ProductDto>
    deleteProduct(userId: number, id: number): Promise<ProductDto>

    createProductMedia(userId: number, productId: number, files: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[]; } | undefined): Promise<ProductDto>
    deleteProductMedia(userId: number, productId: number, mediaId: number): Promise<ProductDto>

}

export class ProductService implements IProductService {

    private _repository: IProductRepository

    private _mediaService: IMediaService

    constructor(repository = new ProductRepository(), mediaService = new MediaService()) {
        this._repository = repository
        this._mediaService = mediaService
    }

    public async getAllProducts(): Promise<ProductDto[]> {
        const products = await this._repository.getAllProducts()
        return products.map(p => ProductDto.parse(p))
    }

    public async getProductById(id: number): Promise<ProductDto> {
        const product = await this._repository.getProductById(id)
        if(!product) throw new NotFound("Product not found")

        return ProductDto.parse(product)
    }

    public async getProductsByUserId(userId: number): Promise<ProductDto[]> {
        const products = await this._repository.getProductsByUserId(userId)
        return products.map(p => ProductDto.parse(p))
    }

    public async createProduct(userId: number, data: ICreateProduct, files: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[]; } | undefined): Promise<ProductDto> {        
        const product = await this._repository.storeProduct(userId, data)

        if(files && Array.isArray(files)) {
            product.media = new Array<IMedia>()

            await Promise.all(files.map(async (f) => {
                const media = await this._mediaService.createMedia(product.id, MediaDto.createFromFile(f))
                product.media!.push(media)
            }))
        }

        return product
    }

    public async updateProduct(userId: number, id: number, data: IUpdateProduct): Promise<ProductDto> {
        const product = await this._repository.updateProduct(id, data)
        
        if(!product) throw new NotFound("Product not found")
        if(product.ownerId !== userId) throw new Unauthorized("You are not authorized to access this product")

        return ProductDto.parse(product)
    }

    public async deleteProduct(userId: number, id: number): Promise<ProductDto> {
        const product = await this._repository.getProductById(id);
        
        if(!product) throw new NotFound("Product not found")
        if(product.ownerId !== userId) throw new Unauthorized("You are not authorized to access this product")

        this._mediaService.deleteAllProductMedias(id)
        
        return ProductDto.parse(await this._repository.deleteProduct(id))
    }

    public async createProductMedia(userId: number, productId: number, files: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[]; } | undefined): Promise<ProductDto> {
        const product = await this._repository.getProductById(productId);
        
        if(!product) throw new NotFound("Product not found")
        if(product.ownerId !== userId) throw new Unauthorized("You are not authorized to access this product")
        if(!files || !Array.isArray(files)) throw new BadRequest("No files provided")
        
        product.media = new Array<IMedia>()
        await Promise.all(files.map(async (f) => {
            await this._mediaService.createMedia(product.id, MediaDto.createFromFile(f))
        }))
        product.media.push(...await this._mediaService.getMediasByProductId(productId))

        return ProductDto.parse(product)
    }

    public async deleteProductMedia(userId: number, productId: number, mediaId: number): Promise<ProductDto> {
        const product = await this._repository.getProductById(productId);
        
        if(!product) throw new NotFound("Product not found")
        if(product.ownerId !== userId) throw new Unauthorized("You are not authorized to access this product")
        if(!mediaId) throw new BadRequest("No media ID provided")
        
        await this._mediaService.deleteProductMedia(productId, mediaId)
        product.media = new Array<IMedia>()
        product.media.push(...await this._mediaService.getMediasByProductId(productId))

        return ProductDto.parse(product)
    }

}