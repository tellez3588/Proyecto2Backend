const nodemailer = require('nodemailer');

const mail = {
    user: 'correo@gmail.com',
    pass: '************'
}




let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    tls: {
        rejectUnauthorized: false
    },
    secure: false, // true for 465, false for other ports
    auth: {
        user: mail.user, // generated ethereal user
        pass: mail.pass, // generated ethereal password
    },
});


const sendMailPasswordless = async (email, html) => {
    try {

        // send mail with defined transport object
        await transporter.sendMail({
            from: `News Cover <${mail.user}>`, // sender address
            to: email, // list of receivers
            subject: "Confirmación de correo", // Subject line
            text: "Este es un correo de prueba", // plain text body
            html:html, // html body
        });

    } catch (error) {
        console.log('Algo esta mal con el correo', error)

    }

}


const getTemplatePL = (name, token) => {
    return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <img src="https://i.imgur.com/eboNR82.png" alt="">
          <h2>Hola ${ name }</h2>
          <p>Para ingresar a tu cuenta, ingresa al siguiente enlace</p>
          <a
              href="http://localhost:4000/api/login/confirm/${ token }"
              target="_blank"
          >Confirmar Cuenta</a>
      </div>
    `;
}

module.exports = {
    sendMailPasswordless,
  getTemplatePL
}