import User from '../users/user.model.js'
import { hash, verify } from 'argon2'
import { generarJWT } from "../../helpers/JWT-generate.js"

export const register = async (req, res) => {
    try {
        const data = req.body

        let profilepicture = req.file ? `profiles/${req.file.filename}` : 'profiles/default-avatar.png'
        const encryptedPassword = await hash(data.password)

        const newuser = await User.create({
            name: data.name,
            surname: data.surname,
            username: data.username,
            email: data.email,
            password: encryptedPassword,
            profilepicture,
            phone: data.phone || ""
        })

        const token = await generarJWT(newuser.id, newuser.email);

        return res.status(200).json({
            message: "Usuario registrado correctamente",
            userDetails: {
                uid: newuser.id,
                username: newuser.username,
                email: newuser.email,
                name: newuser.name,
                surname: newuser.surname,
                phone: newuser.phone,
                profilePicture: newuser.profilepicture,
                token: token
            }
        });
    } catch (error) {
        console.error("Error en register controller:", error);

        if (error.code === 11000) {
            const pattern = error.keyPattern || error.keyValue || {};
            const field = Object.keys(pattern)[0];
            return res.status(400).json({
                message: `El ${field === 'username' ? 'nombre de usuario' : 'correo electrónico'} ya está en uso.`,
                error: true
            });
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: messages[0],
                error: true
            });
        }

        return res.status(500).json({
            message: 'Error al registrar el usuario',
            err: error.message
        })
    }
}
export const login = async (req, res) => {
    const { email, password, username } = req.body;
    const loginValue = email || username;

    try {
        if (!loginValue || !password) {
            return res.status(400).json({ message: "El usuario/email y la contraseña son obligatorios" });
        }

        const lowerValue = loginValue.toLowerCase();

        const user = await User.findOne({
            $or: [{ email: lowerValue }, { username: lowerValue }],
        });

        if (!user) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        const validPassword = await verify(user.password, password);

        if (!validPassword) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        const token = await generarJWT(user.id, user.email);

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            userDetails: {
                uid: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                surname: user.surname,
                phone: user.phone,
                profilePicture: user.profilepicture,
                token: token
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error del servidor",
            error: error.message,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { uid } = req;
        const { name, surname, username, email, phone } = req.body;

        let updateData = {};
        if (name) updateData.name = name;
        if (surname) updateData.surname = surname;
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;

        // Si se subió una nueva imagen
        if (req.file) {
            updateData.profilepicture = `profiles/${req.file.filename}`;
        }

        const updatedUser = await User.findByIdAndUpdate(
            uid,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                error: true
            });
        }

        return res.status(200).json({
            message: "Perfil actualizado correctamente",
            userDetails: {
                uid: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                profilePicture: updatedUser.profilepicture,
                name: updatedUser.name,
                surname: updatedUser.surname,
                phone: updatedUser.phone
            },
            error: false
        });

    } catch (error) {
        console.error("Error en updateProfile:", error);

        if (error.code === 11000) {
            const pattern = error.keyPattern || error.keyValue || {};
            const field = Object.keys(pattern)[0];
            return res.status(400).json({
                message: `El ${field === 'username' ? 'nombre de usuario' : 'correo electrónico'} ya está en uso.`,
                error: true
            });
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: messages[0],
                error: true
            });
        }

        return res.status(500).json({
            message: error.message || "Error al actualizar el perfil",
            error: true
        });
    }
};
