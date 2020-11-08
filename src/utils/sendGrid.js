//sendgrid.js
//a) set sendgrid's api key
const sgMail = require('@sendgrid/mail');
const createHtmlEmail = require('./buildmail');

sgMail.setApiKey(process.env.GATSBY_SENDGRID_KEY); 

module.exports = (data, graphURL) => {
    return sgMail.send({ 
            to: process.env.GATSBY_SEND_EMAIL,
            from: process.env.GATSBY_MY_EMAIL,
            subject: 'Hock-Hocking-report',
            html: createHtmlEmail(data, graphURL), //b) create html email & send
            });
}