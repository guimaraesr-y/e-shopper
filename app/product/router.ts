import { Router } from "express";
import { IProductController, ProductController } from "./controller";
import AuthHandler from "../middlewares/auth";
import Multer from "../middlewares/multer";

export default class ProductRouter {
    
    private _router: Router;
    private _controller: IProductController;

    constructor(router = Router(), controller = new ProductController()) {
        this._router = router;
        this._controller = controller;

        const upload = Multer.upload;

        this._router.get('/', (req, res, next) => this._controller.getAllProducts(req, res, next));
        this._router.get('/:id', (req, res, next) => this._controller.getProductById(req, res, next));
        this._router.get('/user/:id', (req, res, next) => this._controller.getProductsByUserId(req, res, next));
        
        this._router.post('/', AuthHandler.checkAuth, upload, (req, res, next) => this._controller.createProduct(req, res, next));
        this._router.put('/:id', AuthHandler.checkAuth, upload,(req, res, next) => this._controller.updateProduct(req, res, next));
        this._router.delete('/:id', AuthHandler.checkAuth, (req, res, next) => this._controller.deleteProduct(req, res, next));

        this._router.post('/media/:id', AuthHandler.checkAuth, upload, (req, res, next) => this._controller.createProductMedia(req, res, next));
        this._router.delete('/:productId/media/:mediaId', AuthHandler.checkAuth, (req, res, next) => this._controller.deleteProductMedia(req, res, next));
    }

    get router(): Router {
        return this._router;
    }
}