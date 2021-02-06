import { Usuario } from "../models/usuario";

export class EmailService {

    nodeMailer = require('nodemailer')

    emailTasaHome: string = process.env.EMAIL_USER || ""

    pass: string = process.env.EMAIL_PASS || ""

    transporter: any

    smtpConfig: any

    constructor() {
        this.smtpConfig = {
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: this.emailTasaHome,
                pass: this.pass
            }
        }
        this.transporter = this.nodeMailer.createTransport(this.smtpConfig)
    }


    enviarEmail(emisor: Usuario, email_receptor: string, mensaje: string) {

        let mailOptions = {
            
            from: `"TasaHome" <${this.emailTasaHome}>`,
            to: email_receptor,
            subject: 'Nuevo mensaje de ' + emisor.nombre + " " + emisor.apellido,
            text: mensaje
        }

        this.transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        })
    }

    recuperarContrasenia(email_receptor: string, link: string) {

        let mailOptions = {
            
            from: `"TasaHome" <${this.emailTasaHome}>`,
            to: email_receptor,
            subject: 'Nueva contraseña solicitada',
            text: 'Hace click acá: \n' + link
        }

        this.transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        })
    }
}