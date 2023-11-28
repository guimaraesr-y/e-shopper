import { config as dotenvConfig } from "dotenv-safe";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
dotenvConfig();

export default class Jwt {

    private static _secret: Secret = process.env.JWT_SECRET!;

    public static sign(payload: string | object | Buffer): string {
        return jwt.sign(payload, this._secret);
    }

    public static verify(token: string): string | object | JwtPayload {
        return jwt.verify(token, this._secret);
    }

}