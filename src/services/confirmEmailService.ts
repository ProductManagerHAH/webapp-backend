import ConfirmationModel from '../models/confirmationModels';
import PatientModel from '../models/patientModel';




export default class EmailServiceClass {

    /**
    * Check email
    */
    public confirmEmail(email: string) {

        return PatientModel.find({ email:email });
    }

    /**
    * send email
    */
    public addConfirmation(email:string,password:string,confirmationId: string) {

        const confirm = new ConfirmationModel({
            date: new Date(),
            email: email,
            password:password,
            confirmationId: confirmationId, 
            used:false
        });

        return confirm.save();
    }
}