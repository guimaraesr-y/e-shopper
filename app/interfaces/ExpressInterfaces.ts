import { Request } from "express";
import { UserDto } from "../user/dto";

export interface IRequest extends Request {

    user?: UserDto | null

}