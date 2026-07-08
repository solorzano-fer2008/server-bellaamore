import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Añadido para el redireccionamiento
import axios from 'axios';
import { LuCalendar, LuClock, LuUsers, LuPhone, LuMail, LuLock } from 'react-icons/lu';
import backgroundImage from '../assets/img/restaurantefondo3.png';
import toast from 'react-hot-toast';

export const ReservacionesPage = () => {
    
    const isAuthenticated = localStorage.getItem("token");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        special_request: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post('https://bellamore-api.onrender.com/api/reservations', formData);

            if (response.data.success) {
                if (response.data.message.includes('problema')) {
                    toast.success('¡Reservación guardada! (Hubo un problema con el correo)');
                } else {
                    toast.success('¡Reservación enviada con éxito! Revisa tu correo.');
                }
                setFormData({
                    name: '', email: '', phone: '', date: '', time: '', guests: '2', special_request: ''
                });
            }
        } catch (error) {
            console.error("ERROR COMPLETO:", error);
            console.error("RESPUESTA:", error.response?.data);

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Error al enviar. ¿Configuraste bien el .env?"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-30" 
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                <div className="relative z-10 bg-zinc-900/90 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl text-center max-w-md w-full">
                    <div className="bg-purple-600/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <LuLock className="text-purple-500 text-4xl" />
                    </div>
                    <h2 className="text-white text-3xl font-black uppercase tracking-tighter mb-4">Área Privada</h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        Para garantizar la seguridad de tus datos, debes iniciar sesión para realizar una reservación.
                    </p>
                    <Link 
                        to="/login" 
                        className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-xl transition-all uppercase tracking-widest shadow-lg shadow-purple-600/20"
                    >
                        Iniciar Sesión
                    </Link>
                    <Link to="/" className="inline-block mt-6 text-zinc-500 hover:text-white transition-colors underline-offset-4 hover:underline">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans relative">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <LuCalendar className="text-purple-500 text-6xl mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
                        RESERVACIONES
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Asegura tu mesa en Bella Amore. Vive una experiencia gastronómica única con nosotros.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-400 text-sm font-bold uppercase mb-2">Nombre y Apellido</label>
                                    <input
                                        type="text" name="name" value={formData.name} onChange={handleChange} required
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder-zinc-500"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm font-bold uppercase mb-2">Correo Electrónico</label>
                                    <input
                                        type="email" name="email" value={formData.email} onChange={handleChange} required
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder-zinc-500"
                                        placeholder="nombre@email.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-gray-400 text-sm font-bold uppercase mb-2">Fecha</label>
                                    <div className="relative">
                                        <LuCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                                        <input
                                            type="date" name="date" value={formData.date} onChange={handleChange} required
                                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm font-bold uppercase mb-2">Hora</label>
                                    <div className="relative">
                                        <LuClock className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                                        <input
                                            type="time" name="time" value={formData.time} onChange={handleChange} required
                                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm font-bold uppercase mb-2">Personas</label>
                                    <div className="relative">
                                        <LuUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                                        <select
                                            name="guests" value={formData.guests} onChange={handleChange}
                                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Persona' : 'Personas'}</option>)}
                                            <option value="9+">Más de 8</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-bold uppercase mb-2">Numero de Teléfono</label>
                                <input
                                    type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder-zinc-500"
                                    placeholder="2323-2323"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-bold uppercase mb-2">Solicitudes Especiales</label>
                                <textarea
                                    name="special_request" value={formData.special_request} onChange={handleChange}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors h-32 resize-none placeholder-zinc-500"
                                    placeholder="¿Alguna alergia o preferencia de mesa?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-xl transition-all duration-300 uppercase tracking-widest text-lg shadow-lg shadow-purple-600/30 active:scale-[0.98] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Enviando...' : 'Confirmar Reservación'}
                            </button>
                        </form>
                    </div>

                    {/* Info Section */}
                    <div className="space-y-6">
                        <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-6">
                            <h3 className="text-xl font-bold text-white mb-4 uppercase">Contacto Directo</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-gray-300">
                                    <LuPhone className="text-purple-500 shrink-0" />
                                    <span>2356-7890</span>
                                </div>
                                <div className="flex items-start gap-4 text-gray-300">
                                    <LuMail className="text-purple-500 mt-1 shrink-0" />
                                    <span className="text-sm break-all">restaurantereservacionesbellaamore@gmail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
