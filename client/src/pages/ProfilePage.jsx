import { useState, useEffect } from 'react';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserIcon, EnvelopeIcon, PhoneIcon, CameraIcon, PencilIcon, ArrowLeftIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { getImageUrl } from '../utils/getImage';

export const ProfilePage = () => {
    const navigate = useNavigate();
    const { updateUser, isLoading } = useUpdateUser();
    const [isEditing, setIsEditing] = useState(false);

    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        username: '',
        email: '',
        phone: '',
        profilePicture: null
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [originalData, setOriginalData] = useState({});

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
        const initialData = {
            name: savedUser.name || '',
            surname: savedUser.surname || '',
            username: savedUser.username || '',
            email: savedUser.email || '',
            phone: savedUser.phone || '',
            profilePicture: null
        };
        setUserData(initialData);
        setOriginalData(initialData);

        if (savedUser.profilePicture) {
            setPreviewImage(getImageUrl(savedUser.profilePicture));
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

    const cancelEdit = () => {
        setUserData(originalData);
        setIsEditing(false);
        // Reset preview image if it was changed
        const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (savedUser.profilePicture) {
            setPreviewImage(getImageUrl(savedUser.profilePicture));
        } else {
            setPreviewImage(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToUpdate = {};
        // Only include fields that have values or if it's the profile picture
        Object.keys(userData).forEach(key => {
            if (key === 'profilePicture') {
                if (userData[key]) dataToUpdate[key] = userData[key];
            } else if (userData[key] !== '') {
                dataToUpdate[key] = userData[key];
            }
        });

        const result = await updateUser(dataToUpdate);
        if (result) {
            setOriginalData({ ...userData, profilePicture: null });
            setIsEditing(false);
            // Updating local state with result to ensure consistency
            setUserData(prev => ({
                ...prev,
                name: result.name,
                surname: result.surname,
                username: result.username,
                email: result.email,
                phone: result.phone,
                profilePicture: null
            }));
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-zinc-400 hover:text-white transition-colors group"
                        >
                            <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-bold uppercase tracking-widest text-sm">Volver</span>
                        </button>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                            Mi <span className="text-purple-500">Perfil</span>
                        </h1>
                        <div className="w-20"></div> {/* Spacer for balance */}
                    </div>

                    <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
                        <form onSubmit={handleSubmit}>
                            {/* Profile Top Banner/Avatar Section */}
                            <div className="relative h-48 bg-gradient-to-r from-purple-900 to-zinc-900 flex items-end justify-center">
                                <div className="absolute -bottom-16">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full border-4 border-zinc-900 bg-zinc-800 overflow-hidden shadow-2xl">
                                            {previewImage ? (
                                                <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-zinc-600">
                                                    <UserIcon className="h-16 w-16" />
                                                </div>
                                            )}
                                        </div>

                                        {isEditing && (
                                            <button
                                                type="button"
                                                onClick={() => document.getElementById('profile-upload').click()}
                                                className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                            >
                                                <CameraIcon className="h-8 w-8 text-white" />
                                            </button>
                                        )}
                                        <input
                                            id="profile-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            disabled={!isEditing || isLoading}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-20 pb-10 px-8 sm:px-12">
                                <div className="flex flex-col items-center mb-10">
                                    {!isEditing ? (
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center space-x-2 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition-all border border-zinc-700 font-bold text-xs uppercase tracking-widest"
                                        >
                                            <PencilIcon className="h-3 w-3" />
                                            <span>Editar Información</span>
                                        </button>
                                    ) : (
                                        <div className="flex space-x-4">
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="flex items-center space-x-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all font-bold text-xs uppercase tracking-widest disabled:opacity-50"
                                            >
                                                <CheckIcon className="h-3 w-3" />
                                                <span>{isLoading ? 'Guardando...' : 'Guardar'}</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={cancelEdit}
                                                disabled={isLoading}
                                                className="flex items-center space-x-2 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-full transition-all border border-zinc-700 font-bold text-xs uppercase tracking-widest"
                                            >
                                                <XMarkIcon className="h-3 w-3" />
                                                <span>Cancelar</span>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Form Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] ml-4">Nombre</label>
                                        <div className="relative">
                                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={userData.name}
                                                onChange={handleChange}
                                                disabled={!isEditing || isLoading}
                                                className={`w-full bg-zinc-950/50 border ${isEditing ? 'border-purple-500/50 focus:border-purple-500' : 'border-zinc-800'} rounded-2xl py-3 pl-12 pr-4 text-white placeholder-zinc-700 focus:outline-none transition-all`}
                                                placeholder="Tu nombre"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] ml-4">Apellido</label>
                                        <div className="relative">
                                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                                            <input
                                                type="text"
                                                name="surname"
                                                value={userData.surname}
                                                onChange={handleChange}
                                                disabled={!isEditing || isLoading}
                                                className={`w-full bg-zinc-950/50 border ${isEditing ? 'border-purple-500/50 focus:border-purple-500' : 'border-zinc-800'} rounded-2xl py-3 pl-12 pr-4 text-white placeholder-zinc-700 focus:outline-none transition-all`}
                                                placeholder="Tu apellido"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] ml-4">Nombre de Usuario</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 font-black text-xs">@</span>
                                            <input
                                                type="text"
                                                name="username"
                                                value={userData.username}
                                                onChange={handleChange}
                                                disabled={!isEditing || isLoading}
                                                className={`w-full bg-zinc-950/50 border ${isEditing ? 'border-purple-500/50 focus:border-purple-500' : 'border-zinc-800'} rounded-2xl py-3 pl-12 pr-4 text-white placeholder-zinc-700 focus:outline-none transition-all`}
                                                placeholder="usuario"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] ml-4">Correo Electrónico</label>
                                        <div className="relative">
                                            <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={userData.email}
                                                onChange={handleChange}
                                                disabled={!isEditing || isLoading}
                                                className={`w-full bg-zinc-950/50 border ${isEditing ? 'border-purple-500/50 focus:border-purple-500' : 'border-zinc-800'} rounded-2xl py-3 pl-12 pr-4 text-white placeholder-zinc-700 focus:outline-none transition-all`}
                                                placeholder="email@ejemplo.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 md:col-span-2 text-center md:text-left">
                                        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] ml-4">Teléfono</label>
                                        <div className="relative max-w-md mx-auto md:mx-0">
                                            <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={userData.phone}
                                                onChange={handleChange}
                                                disabled={!isEditing || isLoading}
                                                className={`w-full bg-zinc-950/50 border ${isEditing ? 'border-purple-500/50 focus:border-purple-500' : 'border-zinc-800'} rounded-2xl py-3 pl-12 pr-4 text-white placeholder-zinc-700 focus:outline-none transition-all`}
                                                placeholder="5555-5555"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Additional Options */}
                    {!isEditing && (
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Seguridad</h3>
                                <p className="text-zinc-500 text-xs mb-4">Mantén tu cuenta protegida cambiando tu contraseña regularmente.</p>
                                <button className="text-purple-500 font-bold text-xs uppercase tracking-widest hover:text-purple-400 transition-colors">Cambiar Contraseña &rarr;</button>
                            </div>
                            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Sesión</h3>
                                <p className="text-zinc-500 text-xs mb-4">¿Terminaste por hoy? Asegúrate de cerrar tu sesión de forma segura.</p>
                                <button
                                    onClick={() => {
                                        localStorage.clear();
                                        window.location.reload();
                                    }}
                                    className="text-red-500 font-bold text-xs uppercase tracking-widest hover:text-red-400 transition-colors"
                                >
                                    Cerrar Sesión &rarr;
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
    );
};
