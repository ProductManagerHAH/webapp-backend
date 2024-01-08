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
export default class EmailConfirmationAPI {
	public async checkEmailavailability(email: string): Promise<boolean> {
		const emailService = new EmailServiceClass();
		try {
			const results = await emailService.confirmEmail(email);
			if (results !== null && results.length > 0) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	public async sendEmail(
		res: Response,
		email: string,
		password: string,
		next: NextFunction
	): Promise<void> {
		const result = await this.checkEmailavailability(email);
		if (result) {
			res.json({
				message: 'Email already exists',
				status: 200,
				data: false,
			});
		} else {
			try {
				const appDir = dirname(require.main.filename);
				readHTMLFile(
					`${appDir}/components/emailPages/emailConfirmation.html`,
					(err: any, html: any) => {
						if (err) {
							console.log('error reading file', err);
							res.json({
								status: 200,
								data: false,
								message: 'There was an error, reading the document',
							});
							return;
						}

						const linkId = createId();

						const template = handlebars.compile(html);
						const replacements = {
							link: `https://appl.healthathome.co.zw/verify/${linkId}`,
						};

						const htmlToSend = template(replacements);

						const transport = nodemailer.createTransport({
							host: 'smtp.zeptomail.eu',
							port: 587,
							auth: {
								user: 'emailapikey',
								pass: 'yA6KbHsI4w//kz0FSBE11sWP+tw1/axq3Sux5n3kfMF1e4S03KE/hkdpItvoITra3NfZ4f4FbYtCII24vtFeeZY0M9MDfJTGTuv4P2uV48xh8ciEYNYhhJ+gALkXFqZBeB0lDCozQvkiWA==',
							},
						});

						const mailOptions = {
							from: '"Welcome Team" <noreply@healthathome.co.zw>',
							to: email,
							subject: 'Health at Home Email Verification',
							html: htmlToSend,
						};

						transport.sendMail(mailOptions, (error: any, info: any) => {
							if (error) {
								return console.log(error);
							}
							console.log('Successfully sent');
							console.log(info.response);
							const emailService = new EmailServiceClass();
							emailService.addConfirmation(email, password, linkId);
							res.json({
								status: 200,
								data: true,
								message: 'Email sent',
							});

							return true;
						});
					}
				);
			} catch (err) {
				next(err);
				console.error(err);
			}
		}
	}
}
