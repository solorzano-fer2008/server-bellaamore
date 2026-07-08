import React, { useState, useEffect } from 'react';
import { LuUtensilsCrossed } from 'react-icons/lu';
import backgroundImage from '../assets/img/restaurantefondo3.png';
import { getProducts } from '../services/apiService';
import { getImageUrl } from '../utils/getImage';

export const PromotionsPage = () => {
    const [promotions, setPromotions] = useState([
        {
            id: 'p1',
            title: "2X1 EN HAMBURGUESAS",
            description: "Martes de sabor",
            subtitle: "SOLO MARTES",
            price: "Q195",
            image: "combo1.webp"
        },
        {
            id: 'p2',
            title: "BRUNCH FAMILIAR",
            description: "Para 4 personas",
            subtitle: "SÁB. Y DOM.",
            price: "Q350",
            image: "combo2.webp"
        },
        {
            id: 'p3',
            title: "NOCHE DE CÓCTELES",
            description: "Bebidas seleccionadas",
            subtitle: "JUEVES",
            price: "Q45",
            image: "combo3.webp"
        }
    ]);

    useEffect(() => {
        const fetchItems = async () => {
            const data = await getProducts('promociones');
            if (data && data.length > 0) {
                setPromotions(prevItems => {
                    const apiTitles = data.map(i => i.title.toUpperCase());
                    const remainingMockItems = prevItems.filter(i => !apiTitles.includes(i.title.toUpperCase()));
                    return [...data, ...remainingMockItems];
                });
            }
        };
        fetchItems();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />

            <div className="relative z-10 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-block mt-4">
                            <LuUtensilsCrossed className="text-purple-500 text-6xl mb-4 mx-auto" />
                            <h1 className="text-5xl font-black uppercase tracking-tighter mb-2 text-white">PROMOCIONES</h1>
                            <p className="text-gray-400 text-sm tracking-widest uppercase">Aplica restricciones</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 items-stretch">
                        {promotions.map((promo) => (
                            <div key={promo.id} className="relative group h-full">
                                {/* Card Container */}
                                <div className="bg-gradient-to-b from-purple-900/50 to-purple-900/20 rounded-3xl p-1 border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] overflow-hidden h-full">
                                    <div className="bg-black/40 rounded-[1.3rem] p-6 relative overflow-hidden h-full flex flex-col items-center">

                                        {/* Price Tag */}
                                        <div className="mb-6 text-center z-10 h-40 flex flex-col justify-center">
                                            <div className="flex items-start justify-center text-white leading-none">
                                                <span className="text-4xl font-bold mt-2">Q</span>
                                                <span className="text-8xl font-black">{promo.price.replace('Q', '')}</span>
                                            </div>
                                            {promo.subtitle && (
                                                <div className="bg-white text-purple-900 px-3 py-1 font-bold text-sm tracking-wider inline-block transform -skew-x-12 mt-2">
                                                    {promo.subtitle}
                                                </div>
                                            )}
                                        </div>

                                        {/* Image */}
                                        <div className="relative z-10 w-full aspect-square mb-12 group-hover:scale-110 transition-transform duration-500 overflow-hidden rounded-2xl border-4 border-purple-500/20 shadow-2xl">
                                            <img
                                                src={getImageUrl(promo.image)}
                                                alt={promo.title}
                                                className="w-full h-full object-cover"
                                            />
                                            {/* Floating Badge */}
                                            <div className="absolute top-0 right-0 bg-purple-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider transform rotate-3">
                                                Por tiempo limitado
                                                <div className="text-xs">{promo.description}</div>
                                            </div>
                                        </div>

                                        {/* Title Footer */}
                                        <div className="mt-auto w-full text-center border-t border-purple-500/30 pt-4">
                                            <div className="text-[10px] text-purple-300 font-bold tracking-[0.2em] mb-1">NUEVO</div>
                                            <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                                                {promo.title}
                                            </h3>
                                            <div className="text-[10px] text-purple-300 font-bold tracking-[0.2em] mt-1 text-right w-full pr-4">MENU</div>
                                        </div>

                                        {/* Decorative Background */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
