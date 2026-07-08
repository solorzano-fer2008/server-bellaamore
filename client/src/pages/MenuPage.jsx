import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuUtensilsCrossed, LuPackage, LuCroissant, LuCupSoda } from 'react-icons/lu';
import { MdBreakfastDining } from "react-icons/md";
import backgroundImage from '../assets/img/restaurantefondo3.png';
import { getProducts } from '../services/apiService';
import { getImageUrl } from '../utils/getImage';
import { ProductCard } from '../components/ui/ProductCard';
import { ProductDetailModal } from '../components/ui/ProductDetailModal';

export const MenuPage = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const categories = [
        { name: 'Individuales', icon: <LuPackage className="text-3xl mb-2" /> },
        { name: 'Postres', icon: <LuCroissant className="text-3xl mb-2" /> },
        { name: 'Bebidas', icon: <LuCupSoda className="text-3xl mb-2" /> },
        { name: 'Desayunos', icon: <MdBreakfastDining className="text-3xl mb-2" /> },
        { name: 'Brunch', icon: <MdBreakfastDining className="text-3xl mb-2" /> },
        { name: 'Almuerzos', icon: <LuUtensilsCrossed className="text-3xl mb-2" /> },
        { name: 'Cenas', icon: <LuUtensilsCrossed className="text-3xl mb-2" /> },
    ];

    const [menuItems, setMenuItems] = useState([
        {
            _id: 'c1',
            title: "COMBO #1 - PAREJA",
            description: "Panes dobles para 2 personas con bebida y complemento",
            price: "$120.00",
            image: "combo1.webp"
        },
        {
            _id: 'c2',
            title: "COMBO #2 - INDIVIDUAL",
            description: "Panes individuales con bebida y complemento",
            price: "$95.00",
            image: "combo2.webp"
        }
    ]);
    useEffect(() => {
        const fetchItems = async () => {
            const data = await getProducts('combos');
            if (data && data.length > 0) {
                setMenuItems(data);
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
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block relative">
                        <LuUtensilsCrossed className="text-white text-5xl mx-auto mb-4 transform -rotate-45" />
                    </div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-white">NUESTRO MENÚ</h1>
                </div>

                {/* Categories */}
                <div className="flex flex-col items-center mb-16 border-b border-gray-200 pb-8 px-4 w-full">
                    <div className="flex flex-wrap justify-center gap-8 mb-8">
                        {categories.map((cat, index) => (
                            <Link key={index} to={`/menu/${cat.name.toLowerCase()}`} className="flex flex-col items-center hover:text-purple-500 cursor-pointer transition-colors group">
                                <span className="text-white group-hover:scale-110 transition-transform group-hover:text-purple-500">{cat.icon}</span>
                                <span className="font-bold text-sm uppercase tracking-wide text-white group-hover:text-purple-500">{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-widest text-green-500 animate-pulse">SEMANA VERDE INICIADA!!!</h2>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {menuItems.map((item) => (
                        <ProductCard 
                            key={item._id || item.id} 
                            item={item} 
                            badgeText="Recomendado" 
                            onSelect={(product) => {
                                setSelectedItem(product);
                                setIsModalOpen(true);
                            }}
                        />
                    ))}
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
