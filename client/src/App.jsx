import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import { DashboardPage } from './pages/DashboardPage';
import { CartProvider } from './contexts/CartContext';

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Verificar si hay un usuario logueado al cargar la app
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      const parsedUser = JSON.parse(savedUser);
      console.log('App - Loading user from localStorage:', parsedUser);
      console.log('App - User role:', parsedUser.role);
      setIsAuthenticated(true);
      setUser(parsedUser);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    console.log('App - Login success, userData:', userData);
    console.log('App - Login success, userDetails:', userData.userDetails);
    console.log('App - Login success, role:', userData.userDetails?.role);
    setIsAuthenticated(true);
    setUser(userData.userDetails);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <BrowserRouter>
      <CartProvider>
        <DashboardPage user={user} onLogout={handleLogout}>
          <AppRoutes onLoginSuccess={handleLoginSuccess} user={user} />
        </DashboardPage>

        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </CartProvider>
    </BrowserRouter>
  );
};