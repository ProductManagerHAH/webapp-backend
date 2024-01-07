"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
const key = crypto
    .createHash('sha256')
    .update(String(process.env.ENCRYPTION_KEY))
    .digest('base64')
    .substring(0, 32);
const cipherAlgorithm = 'aes-256-gcm';
class Crypto {
    static encrypt(str) {
        const initVector = crypto.randomBytes(16);
        const initVectorHex = initVector.toString('hex');
        const cipher = crypto.createCipheriv(cipherAlgorithm, key, initVector);
        const encoded = cipher.update(str, 'utf-8', 'hex') + cipher.final('hex');
        const authTag = cipher.getAuthTag().toString('hex');
        const metaAndEncoded = [authTag, initVectorHex, encoded].join('|');
        return metaAndEncoded;
    }
    static decrypt(str) {
        const [authTag, initVectorHex, encrypted] = str.split('|');
        const initVector = Buffer.from(initVectorHex, 'hex');
        const decipher = crypto.createDecipheriv(cipherAlgorithm, key, initVector);
        decipher.setAuthTag(Buffer.from(authTag, 'hex'));
        const decrypted = decipher.update(encrypted, 'hex', 'utf-8') + decipher.final('utf-8');
        return decrypted;
    }
}
exports.default = Crypto;
//# sourceMappingURL=crypto.js.map