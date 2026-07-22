import mongoose from 'mongoose';
import { hash } from 'argon2';
import dotenv from 'dotenv';
dotenv.config();

// Conexión directa a MongoDB
const MONGODB_URI = 'mongodb+srv://fernandasoolorzano17_db_user:UtiD2LQMnr16A5h9@cluster0.inr8en3.mongodb.net/bellamore?appName=Cluster0';

// Schema de usuario simplificado
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilepicture: { type: String, default: 'https://res.cloudinary.com/dgzqcs3cq/image/upload/v1715636000/profiles/default-avatar.png' },
  phone: { type: String, default: '' },
  role: { type: String, enum: ['ADMIN_ROLE', 'USER_ROLE'], default: 'USER_ROLE' },
  status: { type: Boolean, default: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const createAdminDirect = async () => {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado a MongoDB');

    // Verificar si admin ya existe
    const existingAdmin = await User.findOne({ email: 'admin@bellaamore.com' });
    if (existingAdmin) {
      console.log('El administrador ya existe');
      process.exit(0);
    }

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

    console.log('Administrador creado exitosamente:');
    console.log('Email: admin@bellaamore.com');
    console.log('Password: Admin123!');
    console.log('Username: admin');
    console.log('Role: ADMIN_ROLE');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error creando administrador:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

createAdminDirect();
