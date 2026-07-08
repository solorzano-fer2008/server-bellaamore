import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { getImageUrl } from '../utils/getImage';
import { TrashIcon, PlusIcon, MinusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartSubtotal } = useCart();
  
  console.log('CartPage renderizado, carrito:', cart);
  console.log('Cantidad de productos:', cart.length);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    toast.success('Producto eliminado del carrito');
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Carrito vaciado');
  };

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white font-sans py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-12">
            <ShoppingBagIcon className="h-24 w-24 mx-auto text-purple-500 mb-6" />
            <h1 className="text-3xl font-black uppercase mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-400 mb-8">Agrega productos del menú para comenzar tu pedido</p>
            <Link
              to="/menu"
              className="inline-flex items-center justify-center rounded-full bg-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 transition-colors"
            >
              Ver Menú
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">Tu Carrito</h1>
          <p className="text-gray-400">Revisa tus productos antes de realizar el pedido</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id || item.id}
                className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex items-center gap-6 hover:border-purple-500/30 transition-colors"
              >
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0 bg-black/20 rounded-xl overflow-hidden">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold uppercase text-white mb-1 truncate">
                    {item.title}
                  </h3>
                  <p className="text-purple-500 font-black text-xl mb-2">{item.price}</p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(item._id || item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-purple-600/20 hover:bg-purple-600/40 flex items-center justify-center transition-colors"
                    >
                      <MinusIcon className="h-4 w-4 text-purple-400" />
                    </button>
                    <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id || item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-purple-600/20 hover:bg-purple-600/40 flex items-center justify-center transition-colors"
                    >
                      <PlusIcon className="h-4 w-4 text-purple-400" />
                    </button>
                  </div>
                </div>

                {/* Subtotal and Remove */}
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-purple-400 mb-4">
                    ${getCartSubtotal(item)}
                  </p>
                  <button
                    onClick={() => handleRemoveFromCart(item._id || item.id)}
                    className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/40 transition-colors"
                  >
                    <TrashIcon className="h-5 w-5 text-red-400" />
                  </button>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <button
              onClick={handleClearCart}
              className="w-full py-3 rounded-xl border border-red-600/50 text-red-400 hover:bg-red-600/20 transition-colors font-semibold"
            >
              Vaciar Carrito
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-6 sticky top-8">
              <h2 className="text-xl font-black uppercase mb-6 text-purple-400">Resumen del Pedido</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Productos ({cart.length})</span>
                  <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Envío</span>
                  <span className="text-green-400">Gratis</span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span className="text-purple-500">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceder al Pago</span>
              </Link>

              <Link
                to="/menu"
                className="w-full mt-3 block text-center text-gray-400 hover:text-white transition-colors"
              >
                Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
