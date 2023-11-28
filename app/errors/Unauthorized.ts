import HttpError from './HttpError';

export class Unauthorized extends HttpError {
    
    public httpCode: number;
    public name: string;

    constructor(message: string, httpCode = 401) {
        super(message);

        this.httpCode = httpCode;
        this.name = 'Unauthorized';
    }
    
}
