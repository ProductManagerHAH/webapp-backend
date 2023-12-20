import { dirname } from 'path';
import { NextFunction, Response, Router } from 'express';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { readHTMLFile } from '../components/htmlHelpers/readHtml';
import EmailServiceClass from '../services/confirmEmailService';

import { createId } from '../utilities/stringM';

/**
 * Provides services common to all API methods
 */
export default  class EmailConfirmationAPI {

  public async checkEmailavailability(email:string,): Promise<boolean> {
    
    const emailService = new EmailServiceClass();
    try {
      const results = await emailService.confirmEmail(email);
      if(results !== null && results.length > 0){
        return true;
      } 
      return false;
      

    } catch (e) {
      console.error(e);
      return false;
    }
    
  }

  public async sendEmail(res: Response, email:string,password: string,next: NextFunction): Promise<void> {

    const result = await this.checkEmailavailability(email);
    if(result)  {
      res.json({
        message: 'Email already exists',
        status: 200,
        data: []
      });
    } else {
       try {
      const appDir = dirname(require.main.filename);
        readHTMLFile(`${appDir}/components/emailPages/emailConfirmation.html`, (err: any, html: any) => {
            if (err) {
                console.log('error reading file', err);
                return;
            }

            const linkId = createId();

            const template = handlebars.compile(html);
            const replacements = {
                linkId: `http://localhost:3000/verify/${linkId}`,
            };



            const htmlToSend = template(replacements);

            const transporter = nodemailer.createTransport({
                host: 'smtp.zoho.com',
                secure: true,
                port: 465,
                auth: {
                    user: 'unashe@visionisprimary',
                    pass: 'cwwwwHDrfpaj'
                }
            });



            const mailOptions = {
                from: 'noreply@healthathome.co.zw',
                to: email,
                subject:  'Health at Home Email Verification',
                html: htmlToSend
            };


            transporter.sendMail(mailOptions, (error: any, info: { response: any; }) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(info.response);
                    const emailService = new EmailServiceClass();
                    emailService.addConfirmation(email,password,linkId);
                }
            });

        });

      
    } catch (err) {
            next(err);
            console.error(err);
        }
    }

   



    

  }
}
