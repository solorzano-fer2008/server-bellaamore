import { Router } from 'express';
import { sendReservationEmail } from './reservation.controller.js';
import { validateJWT } from '../../middlewares/jwt-verify.js';

const api = Router();

api.post('/', validateJWT, sendReservationEmail);

export default api;
