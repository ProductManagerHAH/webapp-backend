import mongoose, { Schema } from 'mongoose';
import { IPatient } from '../types/patientTypes';



const PatientSchema = new Schema<IPatient>({
    date: { type: Date, required: true },
    firstName: {
        type: String, required: false,
    },
    lastName: {
        type: String, required: false,
    },
    dob: {
        type:Date,required: false,
    },
    picRef: {
        type: String, required: false
    },
    email: {
        type: String,unique:true
    },
     phoneNumber: {
        type: String, required: false
    },
    password: {
        type: String, required: true
    },
    associatedAccId: {
        type: String, required: false
    },
    associatedRelation: {
        type: String, required: false
    },
    deleted: { type: Boolean, required: true },
}, { timestamps: true });



const PatientModel = mongoose.model<IPatient>('PatientSchema', PatientSchema);

export default PatientModel;