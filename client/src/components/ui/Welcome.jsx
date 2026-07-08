import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/img/restaurantefondo3.png';
import plato1 from '../../assets/img/platodecomida6.png';
import plato2 from '../../assets/img/fondo3.png';
import plato3 from '../../assets/img/foto23.png';
import plato4 from '../../assets/img/foto24.png';


export const Welcome = () => {
  const navigate = useNavigate();


  return (
    <div className="relative min-h-screen bg-black overflow-hidden w-full">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center text-white">

        {/* Floating Elements (Decorative) */}
        <img
          src={plato2}
          alt="Exquisito platillo"
          className="absolute left-[-2%] 2xl:left-[5%] top-[12%] w-72 h-56 object-cover rounded-3xl hidden xl:block rotate-12 hover:rotate-6 hover:scale-110 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-[6px] border-white/10 opacity-90 hover:opacity-100 z-10"
        />
        <img
          src={plato4}
          alt="Nuevo platillo 1"
          className="absolute left-[2%] 2xl:left-[8%] bottom-[15%] w-96 h-72 object-cover rounded-[2rem] hidden xl:block -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 shadow-[0_30px_60px_rgba(0,0,0,0.9)] border-[8px] border-white/10 opacity-100 z-20"
        />
        <img
          src={plato1}
          alt="Especialidad Gourmet"
          className="absolute right-[-2%] 2xl:right-[5%] top-[18%] w-72 h-56 object-cover rounded-3xl hidden xl:block -rotate-12 hover:-rotate-6 hover:scale-110 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-[6px] border-white/10 opacity-90 hover:opacity-100 z-10"
        />
        <img
          src={plato3}
          alt="Nuevo platillo 2"
          className="absolute right-[2%] 2xl:right-[8%] bottom-[12%] w-96 h-72 object-cover rounded-[2rem] hidden xl:block rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 shadow-[0_30px_60px_rgba(0,0,0,0.9)] border-[8px] border-white/10 opacity-100 z-20"
        />

        {/* Badge */}
        <div className="relative z-30 mb-8 transform -rotate-2">
          <span className="bg-red-600 text-white px-6 py-2 text-xl font-black uppercase tracking-wider rounded-sm shadow-xl border-2 border-white/20">
            ¡Nuevos!
          </span>
        </div>

        {/* Main Title */}
        <h1 className="relative z-30 text-6xl sm:text-7xl lg:text-8xl xl:text-[8.5rem] font-black text-white uppercase tracking-tighter leading-none mb-6 drop-shadow-2xl transform -rotate-1">
          Sabores<br />
          <span className="text-yellow-400">Gourmet</span><br />
          Unicos
        </h1>

        {/* Description */}
        <div className="relative z-30 max-w-2xl mx-auto backdrop-blur-md bg-black/60 p-6 rounded-2xl border border-white/20 shadow-2xl">
          <p className="text-lg sm:text-xl text-gray-100 font-medium leading-relaxed">
            Bella Amore es un espacio culinario donde la elegancia y el sabor se encuentran en perfecta armonía.
Cada creación está diseñada con ingredientes selectos y un toque artístico que transforma cada comida en una experiencia memorable, pensada para deleitar todos tus sentidos.
          </p>
        </div>

        {/* CTA Button */}
        <div className="relative z-30 mt-10">
          <Link to="/menu">
            <button className="bg-purple-600 text-white px-10 py-4 text-xl font-bold uppercase tracking-wide rounded-full hover:bg-purple-700 transition-all transform hover:scale-105 shadow-xl ring-4 ring-purple-600/30">
              Ver Menú
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};
