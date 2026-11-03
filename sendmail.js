const nodemailer = require('nodemailer')

let btn = document.querySelector("#senddetails");

const transporter = nodemailer.createTransport(
    {
        secure:true,
        host: 'smtp.gmail.com',
        port:465,
        auth:{
            user: '',
            pass: ''
        }
    }
);

function sendMail(to,sub,msg){
    transporter.sendMail({
        to:to,
        subject:sub,
        html:msg
    });

    console.log("Message Send");
}

sendMail("","Hello","Hello Tejas");
