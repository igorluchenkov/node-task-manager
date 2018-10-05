const nodemailer = require('nodemailer');
const config = require('config')

module.exports = class Mailer {
  constructor (nodemailer, config) {
    const { service, user, pass } = config.get('mailAccountData')

    this.transporter = nodemailer.createTransport({
      service,
      auth: { user, pass }
    })

    this.from = '"MailBot" <iluchenkov@gmail.com>'
  }

  sendMail (mailOptions) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) reject(error)
        resolve(info)
      });
    })
  }

  sendPasswordRecovery (to) {
    const mailOptions = {
      from: this.from,
      to,
      subject: 'Password recovery!',
      text: 'Hey! Want some password recovery? ...'
    };
    
    this.sendMail(mailOptions)
  }
}