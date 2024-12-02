const nodemailer = require('nodemailer')

let btn = document.querySelector("#senddetails");

const transporter = nodemailer.createTransport(
    {
        secure:true,
        host: 'smtp.gmail.com',
        port:465,
        auth:{
            user: 'tejasdeshmukh320@gmail.com',
            pass: 'trhylaftephoagtx'
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

sendMail("tejaldeshmukh9507@gmail.com","Hello","Hello Tejas");