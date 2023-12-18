import { Router } from "express";
import { UserController } from "./controller";
import UserValidation from "../middlewares/userValidation";
import AuthHandler from "../middlewares/auth";

export default class UserRouter {
    
    private _router: Router;
    private _controller: UserController;

    constructor(router = Router(), controller = new UserController()) {
        this._router = router;
        this._controller = controller;

        this._router.get('/', (req, res, next) => this._controller.getAllUsers(req, res, next));
        this._router.get('/:id', (req, res, next) => this._controller.getUser(req, res, next));
        this._router.get('/username/:username', (req, res, next) => this._controller.getUserByUsername(req, res, next));

        this._router.post('/', UserValidation.createValidation, (req, res, next) => this._controller.createUser(req, res, next));
        this._router.put("/:id", AuthHandler.checkAuth, UserValidation.updateValidation, (req, res, next) => this._controller.updateUser(req, res, next));
        this._router.delete("/:id", AuthHandler.checkAuth, (req, res, next) => this._controller.deleteUser(req, res, next));

        this._router.post('/auth', UserValidation.loginValidation, (req, res, next) => this._controller.login(req, res, next));
    }

    get router(): Router {
        return this._router;
    }
}