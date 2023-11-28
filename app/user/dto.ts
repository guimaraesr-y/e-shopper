import { Decimal } from "@prisma/client/runtime/library";
import { IUser } from "../interfaces/UserInterfaces";

export class UserDto {
    id: number;
    name: string;
    lastName: string;
    email: string;
    username: string;
    balance: Decimal;
    is_active: boolean;
    
    constructor(user: IUser) {
        const { 
            id, 
            name, 
            lastName, 
            email, 
            username, 
            balance, 
            is_active 
        } = user;

        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.balance = balance;
        this.is_active = is_active;
    }

    static parse(data: IUser): UserDto {
        return new UserDto(data);
    }
}