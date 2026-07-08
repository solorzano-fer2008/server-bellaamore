import { useState, useEffect } from 'react';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import fondoPlato2 from "../../assets/img/restaurantefondo3.png";
import { UserIcon, EnvelopeIcon, PhoneIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { getImageUrl } from '../../utils/getImage';

export const EditProfile = () => {
    const navigate = useNavigate();
    const { updateUser, isLoading } = useUpdateUser();
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        username: '',
        email: '',
        phone: '',
        profilePicture: null
    });
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setUserData({
            name: user.name || '',
            surname: user.surname || '',
            username: user.username || '',
            email: user.email || '',
            phone: user.phone || '',
            profilePicture: null
        });
        if (user.profilePicture) {
            setPreviewImage(getImageUrl(user.profilePicture));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserData(prev => ({ ...prev, profilePicture: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToUpdate = {};
        Object.keys(userData).forEach(key => {
            if (userData[key] !== null && userData[key] !== '') {
                dataToUpdate[key] = userData[key];
            }
        });

        const result = await updateUser(dataToUpdate);
        if (result) {
            toast.success('Perfil actualizado correctamente');
            navigate('/');
        }
    };

    return (
        <section className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[700px]">

                {/* Left Side - Image */}
                <div className="w-full md:w-5/12 relative bg-gray-200 h-64 md:h-full">
                    <img
                        src={fondoPlato2}
                        alt="Delicious Dish"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white text-left">
                        <h2 className="text-3xl font-bold drop-shadow-lg">EDITAR PERFIL</h2>
                        <p className="text-sm opacity-90 drop-shadow-md text-left">Actualiza tu información personal para una mejor experiencia</p>
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className="absolute left-4 top-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors"
                        title="Volver"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-white overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Profile Picture */}
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative group cursor-pointer" onClick={() => document.getElementById('profile-upload').click()}>
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-rose-500 bg-gray-50 flex items-center justify-center shadow-lg relative">
                                    {previewImage ? (
                                        <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center text-gray-400">
                                            <PhotoIcon className="h-10 w-10 mb-1" />
                                            <span className="text-[10px] font-bold uppercase">Sin Foto</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 bg-black/60 py-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white text-[10px] font-bold uppercase">Cambiar</span>
                                    </div>
                                </div>
                                <input
                                    id="profile-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 rounded-full border-none focus:ring-2 focus:ring-rose-400 text-gray-700 placeholder-gray-400 transition-all text-sm"
                                    placeholder="Nombre"
                                    required
                                    disabled={isLoading}
                                />
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                    <UserIcon className="h-4 w-4" />
                                </div>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="surname"
                                    value={userData.surname}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 rounded-full border-none focus:ring-2 focus:ring-rose-400 text-gray-700 placeholder-gray-400 transition-all text-sm"
                                    placeholder="Apellidos"
                                    required
                                    disabled={isLoading}
                                />
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                    <UserIcon className="h-4 w-4" />
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 rounded-full border-none focus:ring-2 focus:ring-rose-400 text-gray-700 placeholder-gray-400 transition-all text-sm"
                                placeholder="Nombre de usuario"
                                required
                                disabled={isLoading}
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                <UserIcon className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 rounded-full border-none focus:ring-2 focus:ring-rose-400 text-gray-700 placeholder-gray-400 transition-all text-sm"
                                placeholder="Correo electrónico"
                                required
                                disabled={isLoading}
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                <EnvelopeIcon className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="tel"
                                name="phone"
                                value={userData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 rounded-full border-none focus:ring-2 focus:ring-rose-400 text-gray-700 placeholder-gray-400 transition-all text-sm"
                                placeholder="Teléfono"
                                disabled={isLoading}
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                <PhoneIcon className="h-4 w-4" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg shadow-lg shadow-rose-200 transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 mt-4 uppercase tracking-wider text-sm"
                        >
                            {isLoading ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};
