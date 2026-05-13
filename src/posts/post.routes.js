import { Router } from 'express'
import { createPost, getAllPosts, getPostById, deletePost } from './post.controller.js'
import { createpostValidator, getPostValidator } from '../../middlewares/post-validator.js'
import { uploadPostImage } from '../../middlewares/file-uploader.js'
import { validateJWT } from '../../middlewares/jwt-verify.js'

const router = Router()

router.post( "/", validateJWT, uploadPostImage.single('image'), createpostValidator, createPost)

router.get( "/", getAllPosts)

router.get("/:id", getPostValidator, getPostById)

router.delete("/:id", validateJWT, deletePost)

export default router