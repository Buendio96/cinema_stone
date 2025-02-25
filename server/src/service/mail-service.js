import nodemailer from 'nodemailer'

export class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			auth: {
				user: 'breanna.marquardt71@ethereal.email',
				pass: '3bgsa7ktzYXTKq916X'
			}
		})
		// this.transporter = nodemailer.createTransport({
		// 	host: process.env.SMTP_HOST,
		// 	port: process.env.SMTP_PORT,
		// 	secure: true,
		// 	auth: {
		// 		type: "OAuth2",
		// 		user: process.env.SMTP_USER,
		// 		pass: process.env.APP_PASSWORD,
		// 		accessToken: process.env.SMTP_ACCESS_TOKEN,
		// 	},
		// })	
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
