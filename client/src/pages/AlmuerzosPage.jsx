import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuUtensilsCrossed, LuArrowLeft } from 'react-icons/lu';
import backgroundImage from '../assets/img/restaurantefondo3.png';
import { getProducts } from '../services/apiService';
import { ProductCard } from '../components/ui/ProductCard';
import { ProductDetailModal } from '../components/ui/ProductDetailModal';

export const AlmuerzosPage = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [items, setItems] = useState([
        {
            _id: 'a1',
            title: "ALMUERZO EJECUTIVO",
            description: "La opción perfecta para tu día: sopa artesanal del día, plato fuerte a elección y una refrescante bebida natural de la casa.",
            price: "$110.00",
            image: "platodecomida1.png"
        },
        {
            _id: 'a2',
            title: "BOWL SALUDABLE",
            description: "Equilibrio puro en un bowl: base de quinoa orgánica, aguacate fresco, garbanzos crocantes y nuestro aderezo especial de tahini.",
            price: "$135.00",
            image: "platodecomida2.png"
        },
        {
            _id: 'a3',
            title: "PASTA A LA PUTTANESCA",
            description: "Espagueti salteado con aceite de oliva, ajos dorados, aceitunas negras, alcaparras y un toque picante de guindilla.",
            price: "$160.00",
            image: "platodecomida3.png"
        },
        {
            _id: 'a4',
            title: "POLLO EN SALSA VERDE",
            description: "Jugosos trozos de pollo cocinados lentamente en una salsa verde casera con tomatillos, cilantro y chiles serranos.",
            price: "$145.00",
            image: "platodecomida4.png"
        },
        {
            _id: 'a5',
            title: "PESCADO AL MOJO DE AJO",
            description: "Filete de pescado blanco bañado en una salsa de ajo y mantequilla, servido con verduras al vapor y arroz jazmín.",
            price: "$175.00",
            image: "pescado.jpg"
        },
        {
            _id: 'a6',
            title: "HAMBURGUESA CLÁSICA CON PAPAS",
            description: "Hamburguesa artesanal de res con queso derretido, lechuga, tomate y cebolla caramelizada. Acompañada de papas fritas caseras.",
            price: "$155.00",
            image: "platodecomida6.png"
        }
    ]);

    useEffect(() => {
        const fetchItems = async () => {
            const data = await getProducts('almuerzos');
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
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-white">ALMUERZOS</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {items.length > 0 ? (
                      items.map((item) => (
                          <ProductCard 
                            key={item._id || item.id} 
                            item={item} 
                            badgeText="Plato Fuerte" 
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
