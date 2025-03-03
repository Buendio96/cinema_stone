import { google } from 'googleapis'
import nodemailer from 'nodemailer'



export class MailService {
	constructor() {
		this.oAuthClient = new google.auth.OAuth2(
			process.env.CLIENT_ID,
			process.env.CLIENT_SECRET,
			//REDIRECT_URI
		)
		this.oAuthClient.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })
	}

	async sendActivationMail(to, link) {
		const accessToken = await this.oAuthClient.getAccessToken()

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: process.env.MY_EMAIL,
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				refreshToken: process.env.REFRESH_TOKEN,
				accessToken: accessToken,
			},
			tls: {
				rejectUnauthorized: true
			}
		})

		await transporter.sendMail({
			from: process.env.MY_EMAIL,
			to,
			subject: "Активация аккаунта на " + process.env.CLIENT_URL,
			html: `
               <div>
                   <h1>Для активации перейдите по ссылке:</h1>
                   <h2>Точно не скам мамонта xD :-D</h2>
                   <a href="${link}">${link}</a>
               </div>
           `,
		})
	}
}


export const isMailService = new MailService()
