import { ErrorRequestHandler } from "express";
import HttpError from "../errors/HttpError";

export default class ErrorHandler {
    
    public static error: ErrorRequestHandler = (err, _req, res, _next) => {
        if (err instanceof HttpError) {
            const { httpCode, message } = err;

            return res.status(httpCode).json({ error: { message } });
        }

        return res.status(500).json({ error: { message: err.message } });
    };

}