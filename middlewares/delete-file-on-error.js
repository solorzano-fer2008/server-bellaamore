import fs from 'fs/promises'

export const deleteFileOnError = async (err, req, res, next) =>{
    if (!err) return next()

        try {
            if(req.file && req.file.path){
                await fs.unlink(req.file.path)
            }
        }catch(unlinKError){
            console.error('Error al eliminar la imagen: ', unlinKError.message)
            return next(unlinKError)
        }

        return next(err)
}