import { genSaltSync, hashSync, compareSync } from 'bcrypt';

export default class Hasher {

    public static hashPassword(password: string): string {
        const salt = genSaltSync(10);
        return hashSync(password, salt);
    }

    public static comparePassword(password: string, hash: string): boolean {
        return compareSync(password, hash);
    }

}