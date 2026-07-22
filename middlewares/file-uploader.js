import multer from "multer";
import { createCloudinaryStorage } from "../configs/cloudinary.js";

const MIMETYPES = ["image/jpg", "image/jpeg", "image/png"]
const MAX_FILE_SIZE = 5 * 1024 * 1024 //5MB

const createMulterConfig = (folder) => {
    return multer({
        storage: createCloudinaryStorage(folder),
        fileFilter: (req, file, cb) => {
            if (MIMETYPES.includes(file.mimetype)) cb(null, true)
            else cb(new Error('Tipo de archivo no permitido'))
        },
        limits: {
            fileSize: MAX_FILE_SIZE
        }
    })
}


export const uploadProfilePicturre = createMulterConfig("profiles")
export const uploadPostImage = createMulterConfig("posts")
export const uploadProductImage = createMulterConfig("products")