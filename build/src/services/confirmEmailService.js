"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const confirmationModels_1 = __importDefault(require("../models/confirmationModels"));
const patientModel_1 = __importDefault(require("../models/patientModel"));
class EmailServiceClass {
    /**
    * Check email
    */
    confirmEmail(email) {
        return patientModel_1.default.find({ email: email });
    }
    /**
    * send email
    */
    addConfirmation(email, password, confirmationId) {
        const confirm = new confirmationModels_1.default({
            date: new Date(),
            email: email,
            password: password,
            confirmationId: confirmationId,
            used: false
        });
        return confirm.save();
    }
}
exports.default = EmailServiceClass;
//# sourceMappingURL=confirmEmailService.js.map