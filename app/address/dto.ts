import { IAddress } from "../interfaces/AddressInterfaces";
import { IRole } from "../interfaces/RoleInterfaces";

export class AddressDto implements IAddress {
    id: number;
    userId: number;
    title: string;
    addressLine: string;
    number: string;
    complement: string;
    
    constructor(address: IAddress) {
        const { 
            id,
            userId,
            title,
            addressLine,
            number,
            complement
        } = address;

        this.id = id;
        this.userId = userId;
        this.title = title;
        this.addressLine = addressLine;
        this.number = number;
        this.complement = complement;
    }

    static parse(data: IAddress | Object): AddressDto {
        return new AddressDto(data as IAddress);
    }
    
}