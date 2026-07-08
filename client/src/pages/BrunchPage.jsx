import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuUtensilsCrossed, LuArrowLeft } from 'react-icons/lu';
import backgroundImage from '../assets/img/restaurantefondo3.png';
import { getProducts } from '../services/apiService';
import { ProductCard } from '../components/ui/ProductCard';
import { ProductDetailModal } from '../components/ui/ProductDetailModal';

export const BrunchPage = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState([
        {
            _id: 'br1',
            title: "Pan con jamon",
            description: "Pan fresco con jamon y queso manchego",
            price: "$50.00",
            image: "refa1.png"
        },
        {
            _id: 'br2',
            title: "BAGEL GOURMET",
            description: "Bagel recién horneado relleno de salmón ahumado, crema de queso, alcaparras y cebolla morada fresca.",
            price: "$115.00",
            image: "refa2.png"
        },
        {
            _id: 'br3',
            title: "Pan con pollo desmenuzado",
            description: "Pan con pollo desmenuzado, queso manchego y jitomate",
            price: "$100.00",
            image: "refa3.png"
        },
        {
            _id: 'br4',
            title: "NACHOS",
            description: "Nachos con guacamole, pico de gallo y queso",
            price: "$125.00",
            image: "refa4.png"
        },
        {
            _id: 'br5',
            title: "CALDO DE RES",
            description: "Delicioso caldo de res con verduras frescas y un toque casero.",
            price: "$95.00",
            image: "refa5.png"
        },
        {
            _id: 'br6',
            title: "HAMBUERGUESA PREMIUM",
            description: "Hamburguesa premium con carne de res, queso manchego y verduras frescas",
            price: "$110.00",
            image: "refa6.png"
        }
    ]);

    useEffect(() => {
        const fetchItems = async () => {
            const data = await getProducts('brunch');
            if (data && data.length > 0) {
                setItems(data);
            }
        };
        fetchItems();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white font-sans relative">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            {/* Botón Volver */}
            <Link
                to="/menu"
                className="absolute top-8 left-8 z-40 bg-black/60 backdrop-blur-md rounded-full border border-white/10 p-3 text-white hover:border-purple-500 hover:scale-110 transition-all group flex items-center justify-center shadow-lg"
            >
                <LuArrowLeft className="text-2xl group-hover:text-purple-400 transition-colors" />
            </Link>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <div className="inline-block relative">
                        <LuUtensilsCrossed className="text-white text-5xl mx-auto mb-4" />
                    </div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-white">BRUNCH</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {items.length > 0 ? (
                      items.map((item) => (
                          <ProductCard 
                              key={item._id || item.id} 
                              item={item} 
                              badgeText="Especial de Brunch" 
                              onSelect={(product) => {
                                  setSelectedItem(product);
                                  setIsModalOpen(true);
                              }}
                          />
                      ))
                    ) : (
                      <p className="text-gray-400 text-center col-span-full">No hay productos disponibles.</p>
                    )}
                </div>
            </div>

            <ProductDetailModal 
                item={selectedItem} 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
};
