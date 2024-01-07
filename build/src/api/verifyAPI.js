"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyService_1 = __importDefault(require("../services/verifyService"));
/**
 * Provides services common to all API methods
 */
class VerifyApi {
    async checkAndVerify(res, id, next) {
        const verfiyService = new verifyService_1.default();
        try {
            const results = await verfiyService.verifyId(id);
            if (results !== null && results.length > 0) {
                res.json({
                    status: 200,
                    data: results,
                    verified: true,
                    message: 'User verified'
                });
            }
            else {
                res.json({
                    status: 200,
                    data: [],
                    verified: false,
                    message: 'User could not be verified'
                });
            }
        }
        catch (e) {
            console.error(e);
            res.json({
                status: 401,
                data: [],
                verified: false,
                message: 'There was an error verifying please try again'
            });
        }
    }
}
exports.default = VerifyApi;
//# sourceMappingURL=verifyAPI.js.map