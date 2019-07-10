import { Usuario } from "../models/usuario";

export class EmailService {

    nodeMailer = require('nodemailer')

    emailTasaHome: String = 'tasacioneshome@gmail.com'

    transporter: any

    smtpConfig: any

    constructor() {
        this.smtpConfig = {
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'tasacioneshome@gmail.com',
                pass: 'tasahome'
            }
        }
        this.transporter = this.nodeMailer.createTransport(this.smtpConfig)
    }


    enviarEmail(emisor: Usuario, email_receptor: String, mensaje: String) {

        let mailOptions = {
            
            from: '"TasaHome" <tasacioneshome@gmail.com>',
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

    recuperarContrasenia(email_receptor: String, link: String) {

        let mailOptions = {
            
            from: '"TasaHome" <tasacioneshome@gmail.com>',
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