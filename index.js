import dotenv from "dotenv";
dotenv.config();
import { initServer } from './configs/app.js';
import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

console.log('Variables de entorno cargadas:', {
    PORT: process.env.PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    HAS_PASS: !!process.env.EMAIL_PASS
});

initServer();