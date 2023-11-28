"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_safe_1 = require("dotenv-safe");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
(0, dotenv_safe_1.config)();
class Jwt {
    static sign(payload) {
        return jsonwebtoken_1.default.sign(payload, this._secret);
    }
    static verify(token) {
        return jsonwebtoken_1.default.verify(token, this._secret);
    }
}
Jwt._secret = process.env.JWT_SECRET;
exports.default = Jwt;
