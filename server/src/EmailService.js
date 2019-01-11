const nodemailer = require("nodemailer");

const options = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
};

class EmailService {
  constructor() {
    console.log("Connecting to SMTP server.");
    this.emailClient = nodemailer.createTransport(options);
    this.emailClient.verify(function(error, success) {
      if (error) {
        console.error("SMTP configuration was invalid.");
        console.error(error);
      } else {
        console.log("SMTP connection was verified.");
      }
    });
  }

  sendText({ from, to, cc, bcc, subject, text }) {
    return this.emailClient.sendMail({
      from,
      to,
      cc,
      bcc,
      subject,
      text
    });
  }

  sendHtml({ from, to, cc, bcc, subject, html }) {
    return this.emailClient.sendMail({
      from,
      to,
      cc,
      bcc,
      subject,
      html
    });
  }
}

module.exports = new EmailService();
