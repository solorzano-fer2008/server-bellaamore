import { Router } from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from './product.controller.js';

import { validateJWT } from '../../middlewares/jwt-verify.js';

const router = Router();

// Obtener productos
router.get('/', getProducts);

import { seedProductsFn } from './product.controller.js';
router.get('/seed', seedProductsFn);

// Crear producto
router.post('/', validateJWT, createProduct);

// Editar producto
router.put('/:id', validateJWT, updateProduct);

// Eliminar producto (Soft Delete)
router.delete('/:id', validateJWT, deleteProduct);

export default router;