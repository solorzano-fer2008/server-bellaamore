import { check } from 'express-validator'
import { validarCampos } from './validate-values.js'
import { emailExists, usernameExists } from '../helpers/db-validator.js'
import { processFileUpload } from './process-file-upload.js'
import { deleteFileOnError } from './delete-file-on-error.js'

export const registerValidator = [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("surname", "El apellido es obligatorio").not().isEmpty(),
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("username").custom(usernameExists),
    check("email", "No es un email válido").isEmail(),
    check("email").custom(emailExists),
    check("password", "La contraseña debe de tener al menos 8 caracteres").isLength({
        min: 8
    }),
    validarCampos,
    processFileUpload,
    deleteFileOnError
]

export const loginValidator = [
    check("email", "No es un email válido").optional().isEmail(),
    check("username", "El nombre de usuario es opcional").optional(),
    check("password", "La contraseña no debe ser opcional").isLength({
        min: 8
    }),
    validarCampos,
]