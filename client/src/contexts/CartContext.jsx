import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, [cart]);

  const addToCart = (product) => {
    console.log('Agregando al carrito:', product);
    console.log('ID del producto:', product._id || product.id);
    
    setCart((prevCart) => {
      console.log('Carrito anterior:', prevCart);
      
      const productId = product._id || product.id;
      if (!productId) {
        console.error('Producto sin ID válido:', product);
        // Generar un ID temporal si no tiene
        product._id = 'temp_' + Date.now();
      }
      
      const existingProduct = prevCart.find((item) => item._id === productId || item.id === productId);
      
      if (existingProduct) {
        console.log('Producto existe, incrementando cantidad');
        return prevCart.map((item) =>
          item._id === productId || item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      console.log('Producto nuevo, agregando con cantidad 1');
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId && item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId || item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[$,]/g, '')) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartSubtotal = (item) => {
    const price = parseFloat(item.price.replace(/[$,]/g, '')) || 0;
    return (price * item.quantity).toFixed(2);
  };

  const value = {
    cart,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartSubtotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
