import { Decimal } from "@prisma/client/runtime/library";
import { IUser } from "../interfaces/UserInterfaces";
import { IAddress } from "../interfaces/AddressInterfaces";
import { ISale } from "../interfaces/SaleInterfaces";
import { IRole } from "../interfaces/RoleInterfaces";
import { IProduct } from "../interfaces/ProductInterfaces";

export class UserDto {
    id: number;
    name: string;
    lastName: string;
    email: string;
    username: string;
    balance: Decimal;
    is_active: boolean;

    // relations
    addresses?: IAddress[]
    sales?: ISale[]
    roles?: IRole[]
    products?: IProduct[]
    
    constructor(user: IUser) {
        const { 
            id, 
            name, 
            lastName, 
            email, 
            username, 
            balance, 
            is_active,
            addresses,
            sales,
            roles,
            products
        } = user;

        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.balance = balance;
        this.is_active = is_active;

        this.addresses = addresses;
        this.sales = sales;
        this.roles = roles;
        this.products = products;
    }

    static parse(data: IUser): UserDto {
        return new UserDto(data);
    }
}