import mongoose, { Schema } from 'mongoose';
import { IConfirmation } from '../types/confirmationTypes';



const ConfirmationSchema = new Schema<IConfirmation>({
    date: {
        type:Date,required: true,
    },
    email: {
        type: String, required: true
    },
    password: {
        type: String, required: true    
    },
    confirmationId: {
        type: String,required:true
    },
}, { timestamps: true });



const ConfirmationModel = mongoose.model<IConfirmation>('ConfirmationSchema', ConfirmationSchema);

export default ConfirmationModel;