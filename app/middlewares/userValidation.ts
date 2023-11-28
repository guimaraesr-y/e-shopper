import { RequestHandler } from 'express';
import joi from 'joi';
import { BadRequest } from '../errors/BadRequest';
import { ILoginUser, IUpdateUser } from '../interfaces/UserInterfaces';

export default class UserValidation {

    private static _createSchema = joi.object({
        name: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().email().required(),
        username: joi.string().required(),
        password: joi.string().required(),
    });

    private static _updateSchema = joi.object({
        name: joi.string(),
        lastName: joi.string(),
        email: joi.string().email(),
        username: joi.string(),
        password: joi.string(),
    });

    private static _loginSchema = joi.object({
        email: joi.string().email(),
        username: joi.string(),
        password: joi.string().required(),
    });

    public static createValidation: RequestHandler = (req, _res, next) => {
        const { email, name, lastName, password, username } = req.body as IUpdateUser;
        const { error } = UserValidation._createSchema.validate({
            name,
            lastName,
            email,
            username,
            password,
        });

        if (error) return next(new BadRequest(error.message));

        next();
    };

    public static updateValidation: RequestHandler = (req, _res, next) => {
        const { email, name, lastName, password, username } = req.body as IUpdateUser;
        const { error } = UserValidation._updateSchema.validate({
            name,
            lastName,
            email,
            username,
            password,
        });

        if (error) return next(new BadRequest(error.message));

        next();
    };

    public static loginValidation: RequestHandler = (req, _res, next) => {
        const { email, username, password } = req.body as ILoginUser;

        const { error } = UserValidation._loginSchema.validate({
            email,
            username,
            password,
        });

        if (error) return next(new BadRequest(error.message));

        next();
    }
}
