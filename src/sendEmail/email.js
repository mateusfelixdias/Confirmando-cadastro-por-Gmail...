/*
O Nodemailer é uma biblioteca que possibilita que o sistema, 
consiga realizar o envio de e-mail para um usuário facilmente.
*/
const nodemailer = require('nodemailer');


//Os dados do úsuario cadastrado!
const data = require('../controlUsers/serve');


function userSend(){
    /*
        Config SMTP: Vamos informar o host do SMPT padrão, 
        PORT: porta, 
        SECURE: se o 'app' é seguro, 
        AUTH: o email e senha,
        TLS: para aceitar conexões não seguras.
    */

    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: `${data.Email}`,
            pass: `${data.Password}`
        }, 
        tls: {
            rejectUnauthorrized: false
        }
    });


    /*
        Vamos enviar de fato o email a tal úsuario: As quatro opções mais importantes são:
        from : o remetente do email, 
        to : o destinatário do email,
        subject : o assunto do email, 
        text: seu texto do email.
    */

    async function sendEmail(){
        const mailSend = await transport.sendMail({
            from: `${data.Name} <${data.Email}>`,
            to: `${data.Email}`,
            subject: "Confirmando o cadastro do usuário.",
            text: `Olá, ${data.Name}, seu cadastro foi concluido com sucesso :) !`,
        });
        console.log(mailSend);
    };
    sendEmail();
};

module.exports = userSend();
