import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { createOrder } from '../services/apiService';
import toast from 'react-hot-toast';
import { TruckIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart, getCartTotal } = useCart();
  const [orderType, setOrderType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    phone: '',
    address: '',
    references: '',
    paymentMethod: '',
    observations: ''
  });

  const [restaurantInfo, setRestaurantInfo] = useState({
    name: '',
    phone: '',
    reservationDate: '',
    reservationTime: '',
    numberOfPeople: '',
    observations: ''
  });

  if (cart.length === 0) {
    navigate('/carrito');
    return null;
  }

  const handleDeliveryChange = (e) => {
    setDeliveryInfo({
      ...deliveryInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleRestaurantChange = (e) => {
    setRestaurantInfo({
      ...restaurantInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        type: orderType,
        items: cart.map(item => ({
          productId: item._id || item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          subtotal: (parseFloat(item.price.replace(/[$,]/g, '')) * item.quantity).toFixed(2)
        })),
        total: `$${getCartTotal().toFixed(2)}`,
        deliveryInfo: orderType === 'delivery' ? deliveryInfo : undefined,
        restaurantInfo: orderType === 'restaurant' ? restaurantInfo : undefined
      };

      const response = await createOrder(orderData);

      if (response.error) {
        toast.error(response.message);
      } else {
        clearCart();
        toast.success(`Pedido #${response.order.orderNumber} creado exitosamente`);
        navigate('/');
      }
    } catch (error) {
      toast.error('Error al procesar el pedido');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">Finalizar Pedido</h1>
          <p className="text-gray-400">Elige cómo deseas recibir tu pedido</p>
        </div>

        {/* Order Type Selection */}
        {!orderType && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={() => setOrderType('delivery')}
              className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-8 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group"
            >
              <TruckIcon className="h-16 w-16 mx-auto mb-4 text-purple-500 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-black uppercase mb-2 text-white">Delivery</h2>
              <p className="text-gray-400">Recibe tu pedido en la comodidad de tu hogar</p>
            </button>

            <button
              onClick={() => setOrderType('restaurant')}
              className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-8 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group"
            >
              <BuildingStorefrontIcon className="h-16 w-16 mx-auto mb-4 text-purple-500 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-black uppercase mb-2 text-white">En Restaurante</h2>
              <p className="text-gray-400">Reserva tu mesa y disfruta en nuestro local</p>
            </button>
          </div>
        )}

        {/* Forms */}
        {orderType && (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Delivery Form */}
            {orderType === 'delivery' && (
              <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black uppercase text-purple-400">Información de Delivery</h2>
                  <button
                    type="button"
                    onClick={() => setOrderType('')}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Cambiar opción
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nombre completo *</label>
                    <input
                      type="text"
                      name="name"
                      value={deliveryInfo.name}
                      onChange={handleDeliveryChange}
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={deliveryInfo.phone}
                      onChange={handleDeliveryChange}
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Dirección completa *</label>
                    <input
                      type="text"
                      name="address"
                      value={deliveryInfo.address}
                      onChange={handleDeliveryChange}
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Referencias de ubicación</label>
                    <input
                      type="text"
                      name="references"
                      value={deliveryInfo.references}
                      onChange={handleDeliveryChange}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Método de pago *</label>
                    <select
                      name="paymentMethod"
                      value={deliveryInfo.paymentMethod}
                      onChange={handleDeliveryChange}
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                    >
                      <option value="">Seleccionar</option>
                      <option value="efectivo">Efectivo</option>
                      <option value="tarjeta">Tarjeta</option>
                      <option value="transferencia">Transferencia</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Observaciones</label>
                    <textarea
                      name="observations"
                      value={deliveryInfo.observations}
                      onChange={handleDeliveryChange}
                      rows="3"
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Restaurant Form */}
            {orderType === 'restaurant' && (
              <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black uppercase text-purple-400">Información de Reserva</h2>
                  <button
                    type="button"
                    onClick={() => setOrderType('')}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Cambiar opción
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nombre completo *</label>
                    <input
                      type="text"
                      name="name"
                      value={restaurantInfo.name}
                      onChange={handleRestaurantChange}
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={restaurantInfo.phone}
                      onChange={handleRestaurantChange}
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Fecha de reserva *</label>
                    <input
                      type="date"
                      name="reservationDate"
                      value={restaurantInfo.reservationDate}
                      onChange={handleRestaurantChange}
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Hora *</label>
                    <input
                      type="time"
                      name="reservationTime"
                      value={restaurantInfo.reservationTime}
                      onChange={handleRestaurantChange}
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Cantidad de personas *</label>
                    <input
                      type="number"
                      name="numberOfPeople"
                      value={restaurantInfo.numberOfPeople}
                      onChange={handleRestaurantChange}
                      required
                      min="1"
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Observaciones</label>
                    <textarea
                      name="observations"
                      value={restaurantInfo.observations}
                      onChange={handleRestaurantChange}
                      rows="3"
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-black uppercase text-purple-400 mb-6">Resumen del Pedido</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item._id || item.id} className="flex justify-between items-center text-gray-300">
                    <span>{item.title} x{item.quantity}</span>
                    <span>{item.price}</span>
                  </div>
                ))}
                
                <div className="border-t border-white/10 pt-4 mt-4">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span className="text-purple-500">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/carrito')}
                  className="flex-1 py-4 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors font-semibold"
                >
                  Volver al Carrito
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
