const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false 
    }
});
 
module.exports = transporter;

