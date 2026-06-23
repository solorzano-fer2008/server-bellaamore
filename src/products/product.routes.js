import { Router } from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from './product.controller.js';

import { validateJWT } from '../../middlewares/jwt-verify.js';
import { isAdminRole } from '../../middlewares/admin-verify.js';

const router = Router();

// Obtener productos
router.get('/', getProducts);

import { seedProductsFn } from './product.controller.js';
router.get('/seed', seedProductsFn);

// Crear producto (solo admin)
router.post('/', validateJWT, isAdminRole, createProduct);

// Editar producto (solo admin)
router.put('/:id', validateJWT, isAdminRole, updateProduct);

// Eliminar producto (Soft Delete) (solo admin)
router.delete('/:id', validateJWT, isAdminRole, deleteProduct);

export default router;