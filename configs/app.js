'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

import 'dotenv/config';
import User from "../src/users/user.model.js";
import { dbConnection } from './db.js';
import userModel from '../src/users/user.model.js';
import authRoutes from '../src/auth/auth.routes.js'
import postRoutes from '../src/posts/post.routes.js'
import commentsRoutes from '../src/comments/comment.routes.js'
import reservationRoutes from '../src/reservations/reservation.routes.js'
import productRoutes from '../src/products/product.routes.js'
import orderRoutes from '../src/orders/order.routes.js'

const middlewares = (app) => {
    // CORS configurado para Firebase
    app.use(cors({
        origin: ['https://restaurantebellamore-46e17.web.app', 'http://localhost:5173', 'http://localhost:3000'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        preflightContinue: false,
        optionsSuccessStatus: 204
    }));

    // Manejar explícitamente las peticiones OPTIONS
 /*
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);
});
*/

    app.use(express.json());
    app.use(express.urlencoded({ extended: false })); 
    app.use(helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
        crossOriginEmbedderPolicy: false
    }));
    app.use(morgan('dev'));

    // Log de todas las peticiones
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        console.log('Headers:', req.headers);
        console.log('Body:', req.body);
        next();
    });

    const __dirname = dirname(fileURLToPath(import.meta.url));
    app.use('/assets', express.static(join(__dirname, '../../assets')));
}

const routes = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/posts', postRoutes);
    app.use('/api/comments', commentsRoutes);
    app.use('/api/reservations', reservationRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/orders', orderRoutes);

    // Ruta de bienvenida para verificar que el servidor funciona
    app.get('/', (req, res) => {
        res.send('API de Módulo 2 Mafer funcionando correctamente.');
    });
}

const conectarDB = async () => {
    try {
        await dbConnection();
    } catch (error) {
        console.log(`Error al conectar la db: ${error.message}`)
    }
}
export const initServer = async () => {
    const app = express();
    console.log("Iniciando servidor ...")
    try {
        middlewares(app)
        routes(app)
        await conectarDB()
        return app;
    } catch (error) {
        console.log(`Error al iniciar el servidor: ${error}`);
        throw error;
    }
}