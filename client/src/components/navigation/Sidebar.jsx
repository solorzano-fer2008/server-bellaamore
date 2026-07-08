import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import { getImageUrl } from '../../utils/getImage';

export const Sidebar = () => {
    const location = useLocation();
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        try {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUserDetails(JSON.parse(userData));
            }
        } catch (error) {
            console.error('Error parsing user details:', error);
            setUserDetails({});
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    };

    const userProfileImage = userDetails.profilePicture
        ? getImageUrl(userDetails.profilePicture)
        : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

    // Definir los items del menú condicionalmente
    const baseMenuItems = [
        { name: 'INICIO', path: '/' },
        { name: 'MENÚ', path: '/menu' },
        { name: 'PROMOCIONES', path: '/promociones' },
        { name: 'UBICACIONES', path: '/ubicaciones' },
    ];

    const privateMenuItems = [
        { name: 'DOMICILIO', path: '/domicilio' },
        { name: 'RESERVACIÓN', path: '/reservaciones' },
        { name: 'CREAR COMENTARIO', path: '/publicaciones/crear' },
    ];

    const menuItems = [...baseMenuItems, ...privateMenuItems];

    return (
        <aside className="hidden lg:flex flex-col w-72 bg-zinc-900 border-r border-zinc-800 z-50 h-screen sticky top-0 overflow-y-auto">
            <div className="p-6 flex justify-center border-b border-zinc-800">
                <img src={logo} alt="BELLA AMORE" className="h-20 w-auto object-contain" />
            </div>

            <nav className="flex-1 py-6 flex flex-col space-y-2 px-4">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`
              block px-6 py-3 text-lg font-bold text-gray-400 hover:text-white hover:bg-zinc-800 transition-all uppercase tracking-wider transform -skew-x-6
              ${item.path === location.pathname ? 'text-white border-l-4 border-purple-600 bg-zinc-800' : 'border-l-4 border-transparent'}
            `}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* User Profile Section */}
            {userDetails.username && (
                <div className="p-6 border-t border-zinc-800 bg-zinc-900/50">
                    <div className="flex items-center space-x-3 mb-4">
                        <img
                            src={userProfileImage}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-purple-600 bg-zinc-800 object-cover"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">
                                {userDetails.username || userDetails.name || 'Usuario'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{userDetails.email}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Link
                            to="/perfil"
                            className="block w-full text-center py-2 text-sm font-medium text-white bg-zinc-800 hover:bg-purple-700 rounded transition-colors"
                        >
                            Ver Perfil
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-center py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            )}

            <div className="p-6 pt-2">
                <p className="text-gray-600 text-xs text-center">© 2024 BELLA AMORE</p>
            </div>
        </aside>
    );
};
