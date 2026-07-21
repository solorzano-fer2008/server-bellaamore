import { Router } from "express";
import { createcomment, deleteComment, updateComment } from "./comment.controller.js";
import { createcommentValidator } from "../../middlewares/comment-validator.js";
import { validateJWT } from "../../middlewares/jwt-verify.js";
import { isAdminRole } from "../../middlewares/admin-verify.js";

const router = Router();

// Crear comentario
router.post("/", validateJWT, createcommentValidator, createcomment);

// Actualizar comentario (solo admin)
router.put("/:id", validateJWT, isAdminRole, updateComment);

// Eliminar comentario (solo admin)
router.delete("/:id", validateJWT, isAdminRole, deleteComment);

export default router;