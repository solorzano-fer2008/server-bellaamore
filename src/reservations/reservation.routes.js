import { Router } from 'express';
import { sendReservationEmail } from './reservation.controller.js';

const api = Router();

api.post('/', sendReservationEmail);

export default api;
