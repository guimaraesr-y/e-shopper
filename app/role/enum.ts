export enum RoleEnum {
    Admin = "admin",
    User = "user",
    Seller = "seller",
}

const RoleEnumMap: {[key: string]: RoleEnum} = {
    "admin": RoleEnum.Admin,
    "user": RoleEnum.User,
    "seller": RoleEnum.Seller,
}