import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const createCloudinaryStorage = (folder) => {
    return new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: folder,
            allowed_formats: ['jpg', 'png', 'jpeg'],
            public_id: (req, file) => {
                const fileName = file.originalname.split('.')[0];
                return `${fileName}-${Date.now()}`;
            },
        },
    });
};

export default cloudinary;
