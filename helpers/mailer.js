const nodemailer = require('nodemailer');
const config = require('config')
const winston = require('winston')

class Mailer {
	constructor (nodemailer, config) {
    const { service, user, pass, from } = config.get('mailAccountData')

    this.transporter = nodemailer.createTransport({
      service,
      auth: { user, pass }
    })

    this.from = from
	}

  sendMail (mailOptions) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail({
        from: this.from,
        ...mailOptions
      }, (error, info) => {
        if (error) {
          logRejectedMailSending(error)
          reject(error)
        }
        resolve(info)
      });
    })
  }

  logRejectedMailSending () {
		console.log(error)
    // winston.transports.File({ filename: 'logs/rejectedMails.log' })
  }
}

module.exports = new Mailer(nodemailer, config)