import nodemailer from 'nodemailer';
import Reservation from './reservation.model.js';

export const sendReservationEmail = async (req, res) => {
    try {
        const { name, email, phone, date, time, guests, special_request } = req.body;

        console.log('DATOS DE RESERVACIÓN RECIBIDOS:', { name, email, phone, date, time, guests, special_request });

        // Guardar en la base de datos
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

        return res.status(200).json({
            success: true,
            message: 'Reservación confirmada',
            reservation: {
                name,
                email,
                phone,
                date,
                time,
                guests,
                special_request
            }
        });
    } catch (error) {
        console.error('ERROR GENERAL EN PROCESAR RESERVACIÓN:', error);
        console.error('STACK TRACE:', error.stack);
        return res.status(500).json({ success: false, error: error.message });
    }
};
