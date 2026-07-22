import mongoose from 'mongoose';
import User from './src/users/user.model.js';
import { hash } from 'argon2';
import dotenv from 'dotenv';
dotenv.config();

import { dbConnection } from './configs/db.js';

const createAdmin = async () => {
  try {
    await dbConnection();
    console.log('Conectado a la BD');

    // Check if admin already exists
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
      phone: '0000000000'
    });

    console.log('Administrador creado exitosamente:');
    console.log('Email: admin@bellaamore.com');
    console.log('Password: Admin123!');
    console.log('Username: admin');
    process.exit(0);
  } catch (error) {
    console.error('Error creando administrador:', error);
    process.exit(1);
  }
};

createAdmin();
