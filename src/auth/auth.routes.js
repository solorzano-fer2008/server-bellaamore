import { Router } from "express"
import express from "express"
import { register, login, updateProfile } from './auth.controller.js';
import { privateLimiter, publicLimiter } from "../../middlewares/request-limit.js";
import { uploadProfilePicturre } from "../../middlewares/file-uploader.js"
import { registerValidator, loginValidator } from "../../middlewares/auth-validator.js"
import { validateJWT } from "../../middlewares/jwt-verify.js"
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

const router = Router();

router.post('/register',
  publicLimiter,
  uploadProfilePicturre.single('profilePicture'),
  registerValidator,
  register
);

router.put('/updateProfile',
  validateJWT,
  privateLimiter,
  uploadProfilePicturre.single('profilePicture'),
  updateProfile
)

router.post("/login", publicLimiter, loginValidator, login);

router.use(
  "/getImage",
  express.static(join(CURRENT_DIR, "../../assets/img"))
);

export default router;
