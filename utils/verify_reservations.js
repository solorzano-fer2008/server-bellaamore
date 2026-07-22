import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Reservation from '../src/reservations/reservation.model.js';

dotenv.config();

const verifyDatabase = async () => {
    try {
        await mongoose.connect(process.env.URI_MONGODB || "mongodb://localhost:27017/codegirls");
        console.log('Conectado a MongoDB para verificación.');

        const count = await Reservation.countDocuments();
        console.log(`Número total de reservaciones: ${count}`);

        if (count > 0) {
            const latest = await Reservation.findOne().sort({ createdAt: -1 });
            console.log('Última reservación guardada:');
            console.log(JSON.stringify(latest, null, 2));
        } else {
            console.log('No se encontraron reservaciones en la base de datos.');
        }

        await mongoose.disconnect();
        console.log('Desconectado de MongoDB.');
    } catch (error) {
        console.error('Error en la verificación:', error);
    }
};

verifyDatabase();
