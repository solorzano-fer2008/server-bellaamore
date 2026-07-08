import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuCroissant, LuArrowLeft } from 'react-icons/lu';
import backgroundImage from '../assets/img/restaurantefondo3.png';
import { getProducts } from '../services/apiService';
import { getImageUrl } from '../utils/getImage';
import { ProductCard } from '../components/ui/ProductCard';
import { ProductDetailModal } from '../components/ui/ProductDetailModal';

export const PostresPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([
    {
      _id: 'p1',
      title: "TARTALETA DE FRUTOS",
      description: "Delicada base de pasta sablée rellena de suave crema pastelera artesanal y coronada con una selección de frutos rojos frescos.",
      price: "$85.00",
      image: "postre1.png"
    },
    {
      _id: 'p2',
      title: "BROWNIE CON HELADO",
      description: "Intenso brownie de chocolate belga, servido tibio para un corazón fundente, acompañado de una generosa bola de helado de vainilla bourbon.",
      price: "$95.00",
      image: "postre2.png"
    },
    {
      _id: 'p3',
      title: "PIE DE LIMON",
      description: "Delicioso pie de limon, con ralladura de naranja",
      price: "$85.00",
      image: "postre4.png"
    },
    {
      _id: 'p4',
      title: "PIE DE FRUTOS ROJOS",
      description: "Delicioso pastel de frutos rojos, con merengue y frutos rojos frescos.",
      price: "$95.00",
      image: "postre7.png"
    },
    {
      _id: 'p5',
      title: "TARTALETA DE FRUTOS",
      description: "Delicada base de pasta sablée rellena de suave crema pastelera artesanal y coronada con una selección de frutos rojos frescos.",
      price: "$85.00",
      image: "postre1.png"
    },
    {
      _id: 'p6',
      title: "FLAN TRADICIONAL",
      description: "Delicioso flan casero con salsa de caramelo",
      price: "$95.00",
      image: "postre5.png"
    },
    {
      _id: 'p7',
      title: "TIRAMISU",
      description: "Delicioso tiramisu casero con salsa de caramelo",
      price: "$95.00",
      image: "postre8.png"
    },
  ]);
  useEffect(() => {
    const fetchItems = async () => {
      const data = await getProducts('postres');
      if (data && data.length > 0) {
        setItems(data);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans relative">
      {/* Fondo */}
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
        {/* Título */}
        <div className="text-center mb-12">
          <LuCroissant className="text-white text-5xl mx-auto mb-4" />
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
            POSTRES
          </h1>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {items.map((item) => (
            <ProductCard 
              key={item._id || item.id} 
              item={item} 
              badgeText="Dulzura Gourmet" 
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
