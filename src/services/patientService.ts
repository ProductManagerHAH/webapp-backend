import PatientModel from '../models/patientModel';
import { IPatient } from '../types/patientTypes';

export default class PatientServiceClass {


     public async savePatient(patient: IPatient) {

        
            const pnt = new PatientModel(patient);
            return pnt.save();
        

        
        

         
    };

    public async getPatient(email: string) {

        
        return PatientModel.find({ email:email });
        

         
    };



}
