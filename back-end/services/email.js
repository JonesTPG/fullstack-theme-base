const nodemailer = require('./node_modules/nodemailer');
const config = require('../utils/config');

const from = '"Flow IT" <info@kooditaiturit.fi>';
let transporter = nodemailer.createTransport({
  host: config.SMTP_EMAIL_SERVER,
  port: config.SMTP_PORT,
  secure: true,
  auth: {
    user: config.SMTP_EMAIL_ACCOUNT,
    pass: config.SMTP_EMAIL_PASSWORD
  }
});
/**
 * Sends email with specified content to the recipients.
 * @param {*} recipients recipients of the email
 * @param {*} subject subject of the email
 * @param {*} text text content of the email
 * @param {*} htmlText html content of the email
 */
const sendMail = async (recipients, subject, text, htmlText) => {
  try {
    let info = await transporter.sendMail({
      from: from,
      to: recipients,
      subject: subject,
      text: text,
      html: htmlText
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};
