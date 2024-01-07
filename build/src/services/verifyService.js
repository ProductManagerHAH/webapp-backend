"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const confirmationModels_1 = __importDefault(require("../models/confirmationModels"));
const patientService_1 = __importDefault(require("./patientService"));
class VerifyServiceClass {
    /**
    * Check id
    */
    async verifyId(id) {
        const idExists = await confirmationModels_1.default.find({ confirmationId: id, used: false });
        console.log(idExists);
        if (idExists.length > 0) {
            const doc = await confirmationModels_1.default.findOneAndUpdate({ confirmationId: id }, { used: true }, {
                new: true
            });
            const patient = {
                id: '',
                date: new Date(),
                firstName: '',
                lastName: '',
                dob: new Date(),
                picRef: '',
                email: idExists[0].email,
                phoneNumber: '',
                password: idExists[0].password,
                associatedAccId: '',
                associatedRelation: '',
                deleted: false,
            };
            const userService = new patientService_1.default();
            userService.savePatient(patient);
            return idExists;
        }
        return null;
    }
    ;
}
exports.default = VerifyServiceClass;
//# sourceMappingURL=verifyService.js.map