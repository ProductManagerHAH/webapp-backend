import mongoose, { Schema } from 'mongoose';
import { IAdmin } from '../types/adminTypes';


const AdminSchema = new Schema<IAdmin>({
    date: { type: Date, required: true },
    firstName: {
        type: String, required: true,
    },
    lastName: {
        type: String, required: true,
    },
    picRef: {
        type: String, required: true
    },
    email: {
        type: String,
    },
    password: {
        type: String, required: true
    },
    phoneNumber: {
        type: String, required: true
    },

    deleted: { type: Boolean, required: true },
    accessLevel: { type: [], default: [] },
}, { timestamps: true });



const AdminModel = mongoose.model<IAdmin>('AdminSchema', AdminSchema);

export default AdminModel;