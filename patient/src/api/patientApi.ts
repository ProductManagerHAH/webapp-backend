import { NextFunction,Response, } from 'express';
import { PASSWORD_CRYPTO } from '../constants/patientConstants';
import PatientServiceClass from '../services/patientService';
import CryptoClass from '../utilities/crypto';



/**
 * Provides services common to all API methods
 */
export default  class PatientApi {


    public async signIn(res: Response, email:string,password:string,next: NextFunction): Promise<void> {
        const patientservice = new PatientServiceClass();
    try {
      const results = await patientservice.getPatient(email);
      if(results !== null && results.length > 0){
        const crypto = new CryptoClass();
        const typedPassword = crypto.decrypt(password,PASSWORD_CRYPTO);
        const actualPassword = crypto.decrypt(password,PASSWORD_CRYPTO);
        if(typedPassword === actualPassword) {
           res.json({
                status: 200,
                data:results,
                isUser: true,
                message:'Sign in successful'
            });
        } else {
           res.json({
                status: 200,
                data:results,
                isUser: true,
                message:'Sign in successful'
            });
        }
       
      } else {
        res.json({
            status: 200,
            data:[],
            isUser: false,
            message:'User not found'
        });
      }
      
      

    } catch (e) {
      console.error(e);
      res.json({
            status: 401,
            data:[],
            isUser: false,
            message:'There was an error getting user please try again'
        });
    }

    }
}