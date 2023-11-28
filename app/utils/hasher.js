"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
class Hasher {
    static hashPassword(password) {
        const salt = (0, bcrypt_1.genSaltSync)(10);
        return (0, bcrypt_1.hashSync)(password, salt);
    }
    static comparePassword(password, hash) {
        return (0, bcrypt_1.compareSync)(password, hash);
    }
}
exports.default = Hasher;
