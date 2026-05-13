import { Router } from "express";
import { createcomment, deleteComment } from "./comment.controller.js";
import { createcommentValidator } from "../../middlewares/comment-validator.js";
import { validateJWT } from "../../middlewares/jwt-verify.js";

const router = Router();

// Crear comentario
router.post("/", validateJWT, createcommentValidator, createcomment);

// Eliminar comentario
router.delete("/:id", validateJWT, deleteComment);

export default router;