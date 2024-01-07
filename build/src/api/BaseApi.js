"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const crypto_1 = __importDefault(require("../lib/crypto"));
const logger_1 = __importDefault(require("../lib/logger"));
/**
 * Provides services common to all API methods
 */
class BaseApi {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    /**
     * Global method to send API response
     * @param res
     * @param statusCode
     */
    send(res, statusCode = http_status_codes_1.StatusCodes.OK) {
        let obj = {};
        obj = res.locals.data;
        if (environment.isProductionEnvironment() || environment.isTestEnvironment()) {
            logger_1.default.info(JSON.stringify(obj, null, 2));
        }
        if (environment.applyEncryption) {
            obj = crypto_1.default.encrypt(JSON.stringify(obj));
        }
        res.status(statusCode).send(obj);
    }
}
exports.default = BaseApi;
//# sourceMappingURL=BaseApi.js.map