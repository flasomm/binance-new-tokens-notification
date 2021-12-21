const nodemailer = require('nodemailer');

const SMTP_HOST = 'smtp.ethereal.email';
const SMTP_PORT = 587;

const sendEmail = async list => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Fabrice Sommavilla 👻" <flasomm@gmail.com>',
    to: 'flasomm@gmail.com',
    subject: 'Binance New Cryptos Listing ✔',
    html: list.join('\n'), // html body
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

module.exports = {
  sendEmail,
};
