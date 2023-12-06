import mongoose, { Schema } from 'mongoose';
import { IDoctor } from '../types/doctorTypes';




const DoctorSchema = new Schema<IDoctor>({
    id: {
        type: String,required: true
    },
    date: { type: Date, required: true },
    firstName: {
        type: String, required: true,
    },
    lastName: {
        type: String, required: true,
    },
    gender :{
        type: String, required: true,
    },
    dob: {
        type:Date,required: true,
    },
    picRef: {
        type: String, required: true
    },
    email: {
        type: String,
    },
     phoneNumber: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    specialty: {
        type: [], default: []
    },
    deleted: { type: Boolean, required: true },
}, { timestamps: true });



const DoctorModel = mongoose.model<IDoctor>('DoctorSchema', DoctorSchema);

export default DoctorModel;