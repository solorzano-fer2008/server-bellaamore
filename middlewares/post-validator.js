import { check } from "express-validator";
import { validarCampos } from "./validate-values.js";
import { validateJWT } from "./jwt-verify.js";
import { privateLimiter, publicLimiter } from "./request-limit.js";
import { existePost, isPostOwner } from "../helpers/db-validator.js"



export const createpostValidator = [
    validateJWT,
    privateLimiter,
    check ('title','El titulo es obligatorio'). not().isEmpty(),
    check ('title', 'El titulo no debe exceder los 100 carateres').isLength({ max: 100}),
    check ('content', 'El contenido es obligatorio').not().isEmpty(),
    validarCampos,
];

export const getPostValidator = [
    publicLimiter,
    check("id", "El ID del post es obligatorio").not().isEmpty(),
    check("id", "El ID debe ser un ObjectId válido").isMongoId(),
    check("id").custom(existePost),
    validarCampos,
];