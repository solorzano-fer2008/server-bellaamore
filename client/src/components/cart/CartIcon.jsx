import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../contexts/CartContext';

export const CartIcon = () => {
  const { cartCount } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  console.log('CartIcon renderizado, cartCount:', cartCount);

  return (
    <Link
      to="/carrito"
      className="relative p-2 rounded-full hover:bg-purple-700/20 transition-colors group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ShoppingBagIcon className="h-6 w-6 text-purple-100 group-hover:text-purple-400 transition-colors" />
      
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
          {cartCount > 9 ? '9+' : cartCount}
        </span>
      )}
      
      {isHovered && cartCount > 0 && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl p-3 z-50">
          <p className="text-sm text-gray-700 font-medium">
            {cartCount} {cartCount === 1 ? 'producto' : 'productos'} en el carrito
          </p>
        </div>
      )}
    </Link>
  );
};
