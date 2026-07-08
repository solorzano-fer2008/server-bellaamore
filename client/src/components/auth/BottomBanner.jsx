import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BottomBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t-2 border-purple-600 text-white p-4 flex flex-col sm:flex-row justify-between items-center z-50 shadow-[0_-10px_30px_rgba(147,51,234,0.15)]">
      <div className="mb-4 sm:mb-0 hidden sm:block px-4">
        <h2 className="text-xl font-black uppercase tracking-wider text-purple-400">No te pierdas de lo que estamos cocinando</h2>
        <p className="text-sm font-medium text-gray-300">Las personas en nuestra comunidad son las primeras en enterarse de las ofertas y promociones.</p>
      </div>
      
      <div className="flex gap-4 w-full sm:w-auto px-4">
        <button 
          onClick={() => navigate('/login')}
          className="flex-1 sm:flex-none border-2 border-purple-600 text-white bg-transparent hover:bg-purple-600 font-bold py-2 px-6 rounded-full transition-all uppercase tracking-wider"
        >
          Iniciar sesión
        </button>
        <button 
          onClick={() => navigate('/registro')}
          className="flex-1 sm:flex-none bg-purple-600 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700 transition-all uppercase tracking-wider shadow-lg ring-2 ring-purple-600/30"
        >
          Regístrate
        </button>
      </div>
    </div>
  );
};
