import React from 'react';
import { LuMapPin, LuPhone, LuClock } from 'react-icons/lu';
import backgroundImage from '../assets/img/restaurantefondo3.png';

export const UbicacionesPage = () => {
    const locations = [
        {
            id: 1,
            name: "Bella Amore",
            address: "13 Avenida B 26-81, Zona 13, Colonia La Libertad, Ciudad de Guatemala",
            phone: "+502 2356 7890",
            hours: "Lunes a Viernes: 9:00 AM - 12:00 PM",
            mapsUrl: "https://www.google.com/maps/search/?api=1&query=13+Avenida+B+26-81+Zona+13+Colonia+La+Libertad+Guatemala"
        },
        {
            id: 2,
            name: "Bella Amore - Cayalá",
            address: "Paseo Cayalá, Zona 16, Ciudad de Guatemala",
            phone: "+502 2356 7891",
            hours: "Lunes a Domingo: 9:00 AM - 8:00 PM",
            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Paseo+Cayala+Guatemala"
        },
        {
            id: 3,
            name: "Bella Amore - Zona 10",
            address: "Avenida La Reforma 15-54, Zona 10, Edificio Reforma Obelisco, Ciudad de Guatemala",
            phone: "+502 2356 7892",
            hours: "Lunes a Sábado: 7:00 AM - 8:00 PM",
            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Avenida+La+Reforma+15-54+Zona+10+Guatemala"
        },
        {
            id: 4,
            name: "Bella Amore - Zona 11",
            address: "Calzada Roosevelt 22-43, Zona 11, Centro Comercial Miraflores, Ciudad de Guatemala",
            phone: "+502 2356 7893",
            hours: "Lunes a Domingo: 9:00 AM - 10:00 PM",
            mapsUrl: "https://www.google.com/maps/search/?api=1&query=CC+Miraflores+Guatemala"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans relative">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <LuMapPin className="text-purple-500 text-6xl mx-auto mb-6 animate-bounce" />
                    <h1 className="text-5xl font-black uppercase tracking-tighter text-white mb-4">NUESTRAS UBICACIONES</h1>
                    <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
                </div>

                {/* Locations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-start justify-center">
                    {locations.map((loc) => (
                        <div key={loc.id} className="bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-8 hover:border-purple-500/50 transition-all duration-300 shadow-2xl">
                            <h2 className="text-2xl font-bold mb-6 text-purple-400">{loc.name}</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <LuMapPin className="text-purple-500 text-xl mt-1 shrink-0" />
                                    <div>
                                        <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">Dirección</p>
                                        <p className="text-white leading-relaxed">{loc.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <LuPhone className="text-purple-500 text-xl mt-1 shrink-0" />
                                    <div>
                                        <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">Teléfono</p>
                                        <p className="text-white">{loc.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <LuClock className="text-purple-500 text-xl mt-1 shrink-0" />
                                    <div>
                                        <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">Horarios</p>
                                        <p className="text-white">{loc.hours}</p>
                                    </div>
                                </div>
                            </div>

                            <a
                                href={loc.mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 block w-full text-center py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors duration-300 uppercase tracking-widest text-sm shadow-lg shadow-purple-600/30"
                            >
                                Ver en Google Maps
                            </a>
                        </div>
                    ))}

                    {/* Placeholder for more locations */}
                    <div className="bg-zinc-900/40 backdrop-blur-sm rounded-2xl border border-dashed border-white/10 p-8 flex flex-col items-center justify-center text-center opacity-60">
                        <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                            <LuMapPin className="text-gray-500 text-2xl" />
                        </div>
                        <p className="text-gray-400 font-medium">Próximamente más ubicaciones cerca de ti</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
