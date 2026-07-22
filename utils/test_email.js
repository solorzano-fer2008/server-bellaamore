import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: 'e:/Módulo 2 Mafer/server/.env' });

async function testEmail() {
    console.log('Probando envío de correo con:', process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'restaurantereservacionesbellaamore@gmail.com',
        subject: 'Prueba de Conexión Bella Amore',
        text: 'Este es un correo de prueba para verificar la configuración.'
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('¡Éxito! Correo enviado:', info.response);
    } catch (error) {
        console.error('Error al enviar correo:', error.message);
        if (error.code === 'EAUTH') {
            console.error('ERROR DE AUTENTICACIÓN: Probablemente la contraseña de aplicación no es válida.');
        }
    }
}

testEmail();
