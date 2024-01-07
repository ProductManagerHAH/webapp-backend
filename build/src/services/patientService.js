"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientModel_1 = __importDefault(require("../models/patientModel"));
class PatientServiceClass {
    async savePatient(patient) {
        const pnt = new patientModel_1.default(patient);
        return pnt.save();
    }
    ;
    async getPatient(email) {
        return patientModel_1.default.find({ email: email });
    }
    ;
}
exports.default = PatientServiceClass;
//# sourceMappingURL=patientService.js.map