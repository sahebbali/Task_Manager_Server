var nodemailer = require ('nodemailer');

const SendEmailUtility = async(req, res)=>{
    
    let transporter = nodemailer.createTransport({
        host: 'mail.teamrabbil.com',
        port: 25,
        secure: false,
        auth: {
            user : 'info@teamrabbil.com',
            pass: '~R4{bahaC{Qs'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        form: 'Task Manager MERN <info@teamrabbil.com>',
        to:EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    return await transporter.sendMail(mailOptions);
}

module.exports = SendEmailUtility;