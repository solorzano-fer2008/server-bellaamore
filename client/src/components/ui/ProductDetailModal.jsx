import React from 'react';
import { LuX, LuShoppingCart } from 'react-icons/lu';
import { getImageUrl } from '../../utils/getImage';
import { useCart } from '../../contexts/CartContext';
import toast from 'react-hot-toast';

export const ProductDetailModal = ({ item, isOpen, onClose }) => {
  const { addToCart } = useCart();

  if (!isOpen || !item) return null;

  const handleAddToCart = () => {
    console.log('ProductDetailModal: Agregando al carrito', item);
    addToCart(item);
    toast.success('Producto agregado al carrito');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto max-h-[90vh] animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors"
        >
          <LuX className="text-2xl" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-12">
          <img 
            src={getImageUrl(item.image)} 
            alt={item.title} 
            className="max-w-full max-h-full object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-black to-[#111]">
          <div className="mb-8">
            <span className="text-purple-500 font-bold uppercase tracking-widest text-sm mb-2 block">
              Detalle del Producto
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-tight mb-4 tracking-tighter">
              {item.title}
            </h2>
            <div className="h-1 w-20 bg-purple-600 rounded-full mb-6" />
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {item.description}
            </p>
          </div>

          <div className="mt-auto flex flex-col sm:flex-row items-center gap-6">
            <span className="text-4xl font-black text-white tracking-tighter">
              {item.price}
            </span>
            
            <button 
              onClick={handleAddToCart}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-900/20"
            >
              <LuShoppingCart className="text-xl" />
              AGREGAR AL CARRITO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
