module.exports.email = {

	// FattureInCloud
	paymentSubject: "Fattura",

	// Piattaforma
  service: 'SendGrid',
  auth: { user: process.env.SENDGRID_USER, pass: process.env.SENDGRID_PASSWORD},
  templateDir: 'api/emails',
  testMode: false,
  from: process.env.SENDGRID_FROM
}
