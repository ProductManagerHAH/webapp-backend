import { NextFunction,Response, } from 'express';
import VerifyServiceClass from '../services/verifyService';


/**
 * Provides services common to all API methods
 */
export default  class VerifyApi {


    public async checkAndVerify(res: Response, id:string,next: NextFunction): Promise<void> {
        const verfiyService = new VerifyServiceClass();
    try {
      const results = await verfiyService.verifyId(id);
      if(results !== null && results.length > 0){
        res.json({
            status: 200,
            data:results,
            verified: true,
            message:'User verified'
        });
      } else {
        res.json({
            status: 200,
            data:[],
            verified: false,
            message:'User could not be verified'
        });
      }
      
      

    } catch (e) {
      console.error(e);
      res.json({
            status: 401,
            data:[],
            verified: false,
            message:'There was an error verifying please try again'
        });
    }

    }
}