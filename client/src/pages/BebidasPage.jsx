import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuCupSoda, LuArrowLeft } from 'react-icons/lu';
import backgroundImage from '../assets/img/restaurantefondo3.png';
import { getProducts } from '../services/apiService';
import { getImageUrl } from '../utils/getImage';
import { ProductCard } from '../components/ui/ProductCard';
import { ProductDetailModal } from '../components/ui/ProductDetailModal';

export const BebidasPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([
    {
      _id: 'b1',
      title: "LIMONADA ROSA",
      description: "Nuestra refrescante firma: limonada de fresa natural con un toque cítrico balanceado y mucho hielo.",
      price: "$45.00",
      image: "limonada.png"
    },
    {
      _id: 'b2',
      title: "TÉ HELADO",
      description: "Infusión premium de té negro con notas de frutos rojos, menta fresca y un toque de endulzante natural.",
      price: "$40.00",
      image: "bebida2.png"
    },
    {
      _id: 'b3',
      title: "LIMONADA TRADICIONAL",
      description: "Deliciosa limonada con hierbabuena",
      price: "$40.00",
      image: "bebida11.png"
    },
    {
      _id: 'b4',
      title: "COCTEL AZUL",
      description: "Delicioso coctel con piña y azul curazao",
      price: "$70.00",
      image: "bebida12.png"
    },
    {
      _id: 'b5',
      title: "AGUA NATURAL",
      description: "Deliciosa bebida refrescante con de diferentes sabores",
      price: "$30.00",
      image: "bebida13.png"
    },
    {
      _id: 'b6',
      title: "ROJITO",
      description: "Agua mineral con frutos rojos, limón.",
      price: "$35.00",
      image: "bebida17.png"
    }
  ]);
  useEffect(() => {
    const fetchItems = async () => {
      const data = await getProducts('bebidas');
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
          <LuCupSoda className="text-white text-5xl mx-auto mb-4" />
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
            BEBIDAS
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {items.map((item) => (
            <ProductCard 
              key={item._id || item.id} 
              item={item} 
              badgeText="Refrescante" 
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
