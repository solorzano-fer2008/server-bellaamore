import { Router } from 'express'
import { createPost, getAllPosts, getPostById, deletePost, updatePost } from './post.controller.js'
import { createpostValidator, getPostValidator } from '../../middlewares/post-validator.js'
import { uploadPostImage } from '../../middlewares/file-uploader.js'
import { validateJWT } from '../../middlewares/jwt-verify.js'
import { isAdminRole } from '../../middlewares/admin-verify.js'

const router = Router()

router.post("/", validateJWT, isAdminRole, uploadPostImage.single('image'), createpostValidator, createPost)

router.get("/", getAllPosts)

router.get("/:id", getPostValidator, getPostById)

router.put("/:id", validateJWT, isAdminRole, updatePost)

router.delete("/:id", validateJWT, isAdminRole, deletePost)

export default router