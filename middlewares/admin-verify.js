import User from '../src/users/user.model.js';

export const isAdminRole = async (req, res, next) => {
    try {
        const user = await User.findById(req.uid);
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (user.role !== 'ADMIN_ROLE') {
            return res.status(403).json({ message: 'Acceso denegado: se requiere rol de administrador' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error en isAdminRole:', error);
        return res.status(500).json({ message: 'Error del servidor' });
    }
};
