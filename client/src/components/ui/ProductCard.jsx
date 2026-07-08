import React from 'react';
import { getImageUrl } from '../../utils/getImage';
import { useCart } from '../../contexts/CartContext';
import { PlusIcon } from '@heroicons/react/24/outline';

export const ProductCard = ({ item, badgeText, onSelect }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log('ProductCard: Agregando al carrito', item);
    addToCart(item);
  };

  return (
    <div 
      onClick={() => onSelect && onSelect(item)}
      className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden flex flex-col group relative h-full cursor-pointer hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-300"
    >
      {/* Contenedor de Imagen */}
      <div className="w-full h-64 bg-black/20 flex items-center justify-center relative overflow-hidden">
        <img
          src={getImageUrl(item.image)}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {badgeText && (
          <div className="absolute top-4 left-4 bg-purple-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded border border-purple-400 z-10 shadow-lg shadow-purple-900/50">
            {badgeText}
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/5 transition-colors duration-300" />
      </div>

      <div className="flex-1 p-6 flex flex-col justify-between w-full relative z-10">
        <div>
          <h3 className="text-xl font-black uppercase mb-2 text-white leading-tight group-hover:text-purple-400 transition-colors tracking-tighter">
            {item.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
          <span className="text-2xl font-black text-purple-500 tracking-tighter">{item.price}</span>
          <div className="flex items-center gap-2">
            <div className="bg-purple-600/10 text-purple-400 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
              <span className="text-[10px] font-bold uppercase tracking-widest">Ver más</span>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0"
              title="Agregar al carrito"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
