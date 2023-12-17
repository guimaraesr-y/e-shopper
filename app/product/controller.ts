import { NextFunction, Response } from "express"
import { IProductService, ProductService } from "./service"
import { IRequest } from "../interfaces/ExpressInterfaces"
import { ICreateProduct, IUpdateProduct } from "../interfaces/ProductInterfaces"

export interface IProductController {
    
    getAllProducts(req: IRequest, res: Response, next: NextFunction): any
    getProductById(req: IRequest, res: Response, next: NextFunction): any
    getProductsByUserId(req: IRequest, res: Response, next: NextFunction): any
    createProduct(req: IRequest, res: Response, next: NextFunction): any
    updateProduct(req: IRequest, res: Response, next: NextFunction): any
    deleteProduct(req: IRequest, res: Response, next: NextFunction): any

    createProductMedia(req: IRequest, res: Response, next: NextFunction): any
    deleteProductMedia(req: IRequest, res: Response, next: NextFunction): any

}

export class ProductController implements IProductController {

    private _service: IProductService

    constructor(service = new ProductService()) {
        this._service = service
    }

    public async getAllProducts(req: IRequest, res: Response, next: NextFunction) {
        try {
            res.json(await this._service.getAllProducts())
        } catch (error) {
            next(error)
        }
    }

    public async getProductById(req: IRequest, res: Response, next: NextFunction) {
        const { id } = req.params

        try {
            res.json(await this._service.getProductById(Number(id)))
        } catch (error) {
            next(error)
        }
    }

    public async getProductsByUserId(req: IRequest, res: Response, next: NextFunction) {
        const { id } = req.params

        try {
            res.json(await this._service.getProductsByUserId(Number(id)))
        } catch (error) {
            next(error)
        }
    }

    public async createProduct(req: IRequest, res: Response, next: NextFunction) {
        const data = req.body as ICreateProduct
        const { id } = req.user!

        console.log(req.files)
        console.log(data.title)

        try {
            res.json(await this._service.createProduct(id, data, req.files))
        } catch (error) {
            next(error)
        }
    }

    public async updateProduct(req: IRequest, res: Response, next: NextFunction) {
        const data = req.body as IUpdateProduct
        const productId = req.params.id
        const { id } = req.user!

        try {
            res.json(await this._service.updateProduct(id, Number(productId), data))
        } catch (error) {
            next(error)
        }
    }

    public async deleteProduct(req: IRequest, res: Response, next: NextFunction) {
        const productId = req.params.id
        const { id } = req.user!

        try {
            res.json(await this._service.deleteProduct(id, Number(productId)))
        } catch (error) {
            next(error)
        }
    }

    public async createProductMedia(req: IRequest, res: Response, next: NextFunction) {
        const productId = req.params.id
        const { id } = req.user!

        try {
            res.json(await this._service.createProductMedia(id, Number(productId), req.files))
        } catch (error) {
            next(error)
        }
    }

    public async deleteProductMedia(req: IRequest, res: Response, next: NextFunction) {
        const { productId, mediaId } = req.params
        const { id } = req.user!

        try {
            res.json(await this._service.deleteProductMedia(id, Number(productId), Number(mediaId)))
        } catch (error) {
            next(error)
        }
    }

}