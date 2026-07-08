import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.webp';
import backgroundImage from '../../assets/img/restaurantefondo3.png';

export const AuthModal = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/80 backdrop-blur-md p-4 bg-cover bg-center"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${backgroundImage})` }}
    >
      <div className="bg-black/95 w-full max-w-md rounded-2xl shadow-[0_20px_50px_rgba(147,51,234,0.3)] relative flex flex-col p-8 border-2 border-purple-600/50">
        
        {/* Logo superior */}
        <div className="flex justify-center mb-6 mt-4">
          <img src={logo} alt="Bella Amore" className="h-20 w-auto object-contain" />
        </div>

        <div className="text-center md:text-left mb-8">
          <h1 className="text-3xl font-black text-white mb-2 uppercase">REGÍSTRATE AHORA</h1>
          <p className="text-gray-300">¡¡No te pierdas!! Acá no solo encuentras el camino de la buena gastronomía, sino también de las mejores promociones.</p>
        </div>

        <div className="space-y-4 w-full px-2">
          <button 
            onClick={() => navigate('/login')}
            className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-full hover:bg-purple-700 hover:scale-105 transition-all text-lg shadow-lg ring-2 ring-purple-600/30 flex items-center justify-center uppercase tracking-wider"
          >
            Iniciar sesión
          </button>
          <button 
            onClick={() => navigate('/registro')}
            className="w-full bg-black border-2 border-purple-600 text-purple-400 font-bold py-3 px-4 rounded-full hover:bg-purple-600/10 hover:text-white transition-all text-lg uppercase tracking-wider"
          >
            Regístrate
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Al registrarte, aceptas los <a href="#" className="text-purple-400 hover:text-purple-300 hover:underline">Términos de servicio</a> y la <a href="#" className="text-purple-400 hover:text-purple-300 hover:underline">Política de privacidad</a>.
        </div>
      </div>
    </div>
  );
};
