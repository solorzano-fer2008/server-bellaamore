import nodemailer from 'nodemailer';
import Reservation from './reservation.model.js';

export const sendReservationEmail = async (req, res) => {
    try {
        const { name, email, phone, date, time, guests, special_request } = req.body;

        console.log('DATOS DE RESERVACIÓN RECIBIDOS:', { name, email, phone, date, time, guests, special_request });

        // 1. Guardar en la base de datos
        const newReservation = new Reservation({
            name,
            email,
            phone,
            date,
            time,
            guests,
            special_request
        });

        try {
            await newReservation.save();
            console.log('RESERVACIÓN GUARDADA EN DB EXITOSAMENTE');
        } catch (dbError) {
            console.error('ERROR AL GUARDAR EN MONGODB:', dbError);
            return res.status(500).json({ 
                success: false, 
                error: 'Error al guardar en base de datos: ' + dbError.message 
            });
        }

        // 2. Enviar correo electrónico
        console.log('INTENTANDO ENVIAR CORREO ELECTRÓNICO...');
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false // Ayuda con problemas de certificado en algunos entornos
            }
        });

        const mailOptions = {
            from: `"Reservaciones Bella Amore" <${process.env.EMAIL_USER}>`,
            to: 'restaurantereservacionesbellaamore@gmail.com',
            subject: `Nueva Reservación: ${name}`,
            html: `<h3>Nueva Reservación Recibida</h3>
                   <p><strong>Nombre:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Teléfono:</strong> ${phone}</p>
                   <p><strong>Fecha:</strong> ${date}</p>
                   <p><strong>Hora:</strong> ${time}</p>
                   <p><strong>Personas:</strong> ${guests}</p>
                   <p><strong>Notas:</strong> ${special_request || 'Sin notas'}</p>
                   <p><small>Esta reservación ha sido guardada .</small></p>`
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('CORREO ENVIADO EXITOSAMENTE');
        } catch (emailError) {
            console.error('ERROR AL ENVIAR CORREO (pero se guardó en DB):', emailError);
            console.error('DETALLE DEL ERROR DE CORREO:', emailError.message);
            // Si falla el correo pero se guardó en DB, igual devolvemos éxito pero con un aviso interno
            return res.status(200).json({
                success: true,
                message: 'Reservación guardada, pero hubo un problema enviando el correo de notificación.'
            });
        }

        return res.status(200).json({ success: true, message: 'Reservación guardada y enviada correctamente' });
    } catch (error) {
        console.error('ERROR GENERAL EN PROCESAR RESERVACIÓN:', error);
        console.error('STACK TRACE:', error.stack);
        return res.status(500).json({ success: false, error: error.message });
    }
};
