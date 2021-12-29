const config = require('config');
const nodemailer = require('nodemailer');

const sendEmail = async list => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: config.get('email.smtp_host'),
    auth: {
      user: config.get('email.auth.username'),
      pass: config.get('email.auth.password')
    },
  });

  const info = await transporter.sendMail({
    from: `"${config.get('email.from_text')}" ${config.get('email.from')}`,
    to: config.get('email.to'),
    subject: 'Binance New Cryptos Listing ✔',
    html: list.join('<br/>'),
  });

  console.log('Message sent: %s', info.messageId);
};

module.exports = {
  sendEmail,
};
