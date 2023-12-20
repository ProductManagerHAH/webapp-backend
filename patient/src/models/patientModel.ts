import mongoose, { Schema } from 'mongoose';
import { IPatient } from '../types/patientTypes';



const PatientSchema = new Schema<IPatient>({
    date: { type: Date, required: true },
    firstName: {
        type: String, required: true,
    },
    lastName: {
        type: String, required: true,
    },
    dob: {
        type:Date,required: true,
    },
    picRef: {
        type: String, required: true
    },
    email: {
        type: String,unique:true
    },
     phoneNumber: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    associatedAccId: {
        type: String, required: true
    },
    associatedRelation: {
        type: String, required: true
    },
    deleted: { type: Boolean, required: true },
}, { timestamps: true });



const PatientModel = mongoose.model<IPatient>('PatientSchema', PatientSchema);

export default PatientModel;