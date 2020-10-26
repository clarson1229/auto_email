//sendgrid.js
//a) set sendgrid's api key
const sgMail = require('@sendgrid/mail');
const createHtmlEmail = require('./buildmail');
sgMail.setApiKey(process.env.GATSBY_SENDGRID_KEY); 

module.exports = (message) => {
    return sgMail.send({ 
            to: process.env.MY_EMAIL,
            from: process.env.MY_EMAIL,
            subject: 'Hock-Hocking-report',
            html: createHtmlEmail(message), //b) create html email & send
            });
}