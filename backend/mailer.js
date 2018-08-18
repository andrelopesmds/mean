var nodemailer = require('nodemailer');

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.EMAIL_KEY;
const EMAIL_PROVIDER = 'hotmail';

var transporter = nodemailer.createTransport({
    service: EMAIL_PROVIDER,
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
});

exports.sendEmail = function(mailOptions, callback) {
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) 
            callback(false);

        callback(true);
    });
}
    
