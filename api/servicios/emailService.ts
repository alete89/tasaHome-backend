import { Usuario } from "../models/usuario";

export class EmailService {

    nodemailer = require('nodemailer')

    emailTasaHome: string = process.env.EMAIL_USER || ""

    pass: string = process.env.EMAIL_PASS || ""

    transporter: any

    smtpConfig: any

    constructor() {
        // this.smtpConfig = {
        //     service: 'Gmail',
        //     host: 'smtp.gmail.com',
        //     port: 465,
        //     secure: true, // use SSL
        //     auth: {
        //         user: this.emailTasaHome,
        //         pass: this.pass
        //     }
        // }
        // this.transporter = this.nodemailer.createTransport(this.smtpConfig)
    }

    async enviarMensaje(emisor: Usuario, email_receptor: string, mensaje: string) {

        this.validarMensaje(email_receptor, mensaje)

        let mailOptions = {
            from: `"TasaHome" <${this.emailTasaHome}>`,
            // from: `"${emisor.nombre}" <${emisor.email}>`,
            to: email_receptor,
            subject: 'Nuevo mensaje de ' + emisor.nombre + " " + emisor.apellido,
            text: mensaje
        }

        await this.sendMail(mailOptions)
    }

    validarMensaje(receptor: string, mensaje: string) {
        if (!receptor || !mensaje) {
            throw "Mensaje inválido"
        }
    }

    async recuperarContrasenia(email_receptor: string, link: string) {

        let mailOptions = {
            from: `"TasaHome" <${this.emailTasaHome}>`,
            to: email_receptor,
            subject: 'Nueva contraseña solicitada',
            text: 'Hace click acá: \n' + link
        }

        await this.sendMail(mailOptions)

    }

    async sendMail(mailOptions: any) {

        const nodemailer = require('nodemailer');

        let transporter = await this.getTransporter()

        transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                console.log(error);
            } else {
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            }
        })
    }

    async getTransporter(): Promise<any> {

        const nodemailer = require('nodemailer');

        try {
            const account = await nodemailer.createTestAccount()

            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            })
            return transporter
        } catch (error) {
            console.error(error)
        }
    }
}