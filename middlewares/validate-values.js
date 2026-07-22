import { validationResult } from 'express-validator';
import fs from 'fs/promises'

export const validarCampos = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // Eliminar avatar si hubo errores de validación
        if (req.file && req.file.path) {
            try {
                await fs.unlink(req.file.path)
            } catch (unlinkError) {
                console.error("No se pudo eliminar el archivo subido tras error de validación:", unlinkError.message)
            }
        }

        return res.status(400).json({
            error: true,
            message: 'Errores de validación',
            errors: errors.array()
        })
    }
    next()
}