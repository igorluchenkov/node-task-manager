const nodemailer = require('nodemailer');
const config = require('config')

module.exports = class Mailer {
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

  static sendRegistrationNotify ({ to, text }) {
    const mailOptions = {
      to,
      subject: 'Thank you for join our resource!',
      text
    };

    return this.sendMail(mailOptions)
  }

  static sendPasswordRecovery ({ to }) {
    const mailOptions = {
      to,
      subject: 'Password recovery!',
      text: 'Hey! Want some password recovery? ...'
    };
    
    return this.sendMail(mailOptions)
  }
}