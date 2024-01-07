"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientConstants_1 = require("../constants/patientConstants");
const patientService_1 = __importDefault(require("../services/patientService"));
const crypto_1 = __importDefault(require("../utilities/crypto"));
/**
 * Provides services common to all API methods
 */
class PatientApi {
    async signIn(res, email, password, next) {
        const patientservice = new patientService_1.default();
        try {
            const results = await patientservice.getPatient(email);
            if (results !== null && results.length > 0) {
                const crypto = new crypto_1.default();
                const typedPassword = crypto.decrypt(password, patientConstants_1.PASSWORD_CRYPTO);
                const actualPassword = crypto.decrypt(password, patientConstants_1.PASSWORD_CRYPTO);
                if (typedPassword === actualPassword) {
                    res.json({
                        status: 200,
                        data: results,
                        isUser: true,
                        message: 'Sign in successful'
                    });
                }
                else {
                    res.json({
                        status: 200,
                        data: results,
                        isUser: true,
                        message: 'Sign in successful'
                    });
                }
            }
            else {
                res.json({
                    status: 200,
                    data: [],
                    isUser: false,
                    message: 'User not found'
                });
            }
        }
        catch (e) {
            console.error(e);
            res.json({
                status: 401,
                data: [],
                isUser: false,
                message: 'There was an error getting user please try again'
            });
        }
    }
}
exports.default = PatientApi;
//# sourceMappingURL=patientApi.js.map