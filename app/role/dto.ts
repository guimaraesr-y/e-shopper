import { IRole } from "../interfaces/RoleInterfaces";
import { RoleEnum } from "./enum";

export class RoleDto implements IRole {
    id: number;
    name: RoleEnum;
    
    constructor(role: IRole) {
        const { id, name } = role;

        this.id = id;
        this.name = name;
    }

    static parse(data: IRole): RoleDto {
        return new RoleDto(data);
    }

    static convertRoleEnumToIRole(roleEnumValue: RoleEnum): IRole {
        return {
            id: 0,
            name: roleEnumValue
        }
    }

}