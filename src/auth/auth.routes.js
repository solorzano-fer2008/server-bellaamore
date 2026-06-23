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

// Endpoint temporal para crear admin
router.post("/createAdmin", async (req, res) => {
  try {
    const User = await import('../users/user.model.js').then(m => m.default);
    const { hash } = await import('argon2');
    
    const hashedPassword = await hash('Admin123!');
    
    const admin = await User.create({
      name: 'Admin',
      surname: 'BellaAmore',
      username: 'admin',
      email: 'admin@bellaamore.com',
      password: hashedPassword,
      role: 'ADMIN_ROLE',
      phone: '0000000000',
      profilepicture: 'https://res.cloudinary.com/dgzqcs3cq/image/upload/v1715636000/profiles/default-avatar.png'
    });
    
    res.status(200).json({ success: true, message: 'Admin creado', admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.use(
  "/getImage",
  express.static(join(CURRENT_DIR, "../../assets/img"))
);

export default router;
