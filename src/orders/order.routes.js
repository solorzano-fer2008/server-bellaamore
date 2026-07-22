import { Router } from 'express';
import {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    getUserOrders
} from './order.controller.js';

import { validateJWT } from '../../middlewares/jwt-verify.js';
import { isAdminRole } from '../../middlewares/admin-verify.js';

const router = Router();

// Crear pedido (público o autenticado)
router.post('/', createOrder);

// Obtener todos los pedidos (solo admin)
router.get('/', validateJWT, isAdminRole, getOrders);

// Obtener pedidos del usuario autenticado
router.get('/my-orders', validateJWT, getUserOrders);

// Obtener pedido por ID (solo admin)
router.get('/:id', validateJWT, isAdminRole, getOrderById);

// Actualizar estado del pedido (solo admin)
router.put('/:id/status', validateJWT, isAdminRole, updateOrderStatus);

export default router;
