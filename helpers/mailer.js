const nodemailer = require('nodemailer');
const config = require('config')

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
        if (error) reject(error)
        resolve(info)
      });
    })
  }
}

module.exports = new Mailer(nodemailer, config)