import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuPackage, LuArrowLeft } from 'react-icons/lu';
import backgroundImage from '../assets/img/restaurantefondo3.png';
import { getProducts } from '../services/apiService';
import { getImageUrl } from '../utils/getImage';
import { ProductCard } from '../components/ui/ProductCard';
import { ProductDetailModal } from '../components/ui/ProductDetailModal';

export const IndividualesPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [items, setItems] = useState([
    {
      _id: '1',
      title: "CORTE INDIVIDUAL",
      description: "Jugoso corte premium sellado a la perfección con mantequilla de finas hierbas, acompañado de una ensalada fresca de la estación.",
      price: "$250.00",
      image: "/images/individual1.png"
    },
    {
      _id: '2',
      title: "POLLO A LA PARRILLA",
      description: "Pechuga tierna marinada en especias secretas, asada a la parrilla y servida con vegetales al wok y puré de papa cremoso.",
      price: "$180.00",
      image: "/images/individual2.png"
    },
    {
      _id: '3',
      title: "LASAÑA ARTESANAL",
      description: "Capas de pasta fresca con ragú de res cocinado a fuego lento, mezcla de tres quesos fundidos y salsa pomodoro casera.",
      price: "$165.00",
      image: "individual2.png"
    },
    {
      _id: '4',
      title: "HAMBURGUESA GOURMET",
      description: "Res de alta calidad (200g) en pan brioche, con queso cheddar maduro, tocino crujiente, cebolla caramelizada y papas gajo sazonadas.",
      price: "$195.00",
      image: "individual6.png"
    },
    {
      _id: '5',
      title: "ENSALADA CÉSAR CON SALMÓN",
      description: "Corazones de lechuga romana, crutones artesanales y aderezo César de la casa, coronada con un filete de salmón fresco a la plancha.",
      price: "$210.00",
      image: "ensaladacesar.png"
    },
    {
      _id: '6',
      title: "PASTA ALFREDO",
      description: "Fettuccine al dente bañado en nuestra sedosa salsa de crema y parmesano auténtico, terminado con perejil fresco y pimienta negra.",
      price: "$155.00",
      image: "pasta.png"
    }
  ]);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getProducts('individuales');
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
          <LuPackage className="text-white text-5xl mx-auto mb-4" />
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
            INDIVIDUALES
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {items.length > 0 ? (
            items.map((item) => (
              <ProductCard 
                key={item._id || item.id} 
                item={item} 
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
