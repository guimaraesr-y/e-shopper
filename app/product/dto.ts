import { Decimal } from "@prisma/client/runtime/library";
import { IProduct } from "../interfaces/ProductInterfaces";
import { IUser } from "../interfaces/UserInterfaces";
import { IMedia } from "../interfaces/MediaInterfaces";
import { ISale } from "../interfaces/SaleInterfaces";

export class ProductDto {
    
    id: number
    ownerId: number
    title: string
    description: string
    price: Decimal
    owner?: IUser
    media?: IMedia[]
    sales?: ISale[]
    
    constructor(product: IProduct) {
        const { 
            id,
            ownerId,
            title,
            description,
            price,
            owner,
            media,
            sales
        } = product;

        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.description = description;
        this.price = price;
        this.owner = owner;
        this.media = media;
        this.sales = sales;
    }

    static parse(data: IProduct): ProductDto {
        return new ProductDto(data);
    }
    
}