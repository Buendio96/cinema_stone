import { google } from 'googleapis'

export class MailService {
	constructor() {
		this.oauth2Client = new google.auth.OAuth2(
			process.env.CLIENT_ID,
			process.env.CLIENT_SECRET,
			process.env.REDIRECT_URI
			// host: process.env.SMTP_HOST,
			// port: process.env.SMTP_PORT,
			// secure: false,
			// auth: {
			// user: process.env.SMTP_USER,
			// pass: process.env.SMTP_PASSWORD,

		)
		oauth2Client.setCredentials({
			refresh_token: process.env.REFRESH_TOKEN
		})
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: process.env.SMTP_USER,
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				refreshToken: process.env.REFRESH_TOKEN,
				accessToken: oauth2Client.getAccessToken()
			}
		})
	}
	async sendActivationMail(to, link
	) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: 'Активация аккаунта на ' + process.env.API_URL,
			text: '',
			html: `
				<div>
					<h1>Для активации перейдите по безопасной ссылке: </h1>
					<a href="${link}">${link}</a>
				</div>
			`
		})
	}
}

export const isMailService = new MailService()
