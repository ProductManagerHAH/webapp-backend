import ConfirmationModel from '../models/confirmationModels';
import { IPatient } from '../types/patientTypes';
import UserServiceClass from './patientService';





export default class VerifyServiceClass {

    /**
    * Check id 
    */
    public async verifyId(id: string) {

        const idExists = await ConfirmationModel.find({ confirmationId:id,used:false });
        console.log(idExists);
        if(idExists.length > 0){
            const doc = await ConfirmationModel.findOneAndUpdate({ confirmationId: id }, { used:true }, {
                new: true
            });
            
            const patient:IPatient = {
                id: '',
                date: new Date(),
                firstName: '',
                lastName: '',
                dob: new Date(),
                picRef: '',
                email: idExists[0].email,
                phoneNumber: '',
                password: idExists[0].password,
                associatedAccId:'',
                associatedRelation:'',
                deleted: false,

            };

            const userService = new UserServiceClass();
            userService.savePatient(patient);

            return idExists;
        } 
        return null;
        

         
    };

  
}


