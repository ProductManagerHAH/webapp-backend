"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const handlebars_1 = __importDefault(require("handlebars"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const readHtml_1 = require("../components/htmlHelpers/readHtml");
const confirmEmailService_1 = __importDefault(require("../services/confirmEmailService"));
const stringM_1 = require("../utilities/stringM");
/**
 * Provides services common to all API methods
 */
class EmailConfirmationAPI {
    async checkEmailavailability(email) {
        const emailService = new confirmEmailService_1.default();
        try {
            const results = await emailService.confirmEmail(email);
            if (results !== null && results.length > 0) {
                return true;
            }
            return false;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }
    async sendEmail(res, email, password, next) {
        const result = await this.checkEmailavailability(email);
        if (result) {
            res.json({
                message: 'Email already exists',
                status: 200,
                data: false
            });
        }
        else {
            try {
                const appDir = (0, path_1.dirname)(require.main.filename);
                (0, readHtml_1.readHTMLFile)(`${appDir}/components/emailPages/emailConfirmation.html`, (err, html) => {
                    if (err) {
                        console.log('error reading file', err);
                        res.json({
                            status: 200,
                            data: false,
                            message: 'There was an error, reading the document',
                        });
                        return;
                    }
                    const linkId = (0, stringM_1.createId)();
                    const template = handlebars_1.default.compile(html);
                    const replacements = {
                        link: `http://localhost:3000/verify/${linkId}`,
                    };
                    const htmlToSend = template(replacements);
                    const transport = nodemailer_1.default.createTransport({
                        host: 'smtp.zeptomail.eu',
                        port: 587,
                        auth: {
                            user: 'emailapikey',
                            pass: 'yA6KbHsI4w//kz0FSBE11sWP+tw1/axq3Sux5n3kfMF1e4S03KE/hkdpItvoITra3NfZ4f4FbYtCII24vtFeeZY0M9MDfJTGTuv4P2uV48xh8ciEYNYhhJ+gALkXFqZBeB0lDCozQvkiWA=='
                        }
                    });
                    const mailOptions = {
                        from: '"Welcome Team" <noreply@healthathome.co.zw>',
                        to: email,
                        subject: 'Health at Home Email Verification',
                        html: htmlToSend,
                    };
                    transport.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Successfully sent');
                        console.log(info.response);
                        const emailService = new confirmEmailService_1.default();
                        emailService.addConfirmation(email, password, linkId);
                        res.json({
                            status: 200,
                            data: true,
                            message: 'Email sent',
                        });
                        return true;
                    });
                });
            }
            catch (err) {
                next(err);
                console.error(err);
            }
        }
    }
}
exports.default = EmailConfirmationAPI;
//# sourceMappingURL=emailAPI.js.map