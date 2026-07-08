
import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import fondoLogin from "../../assets/img/restaurantefondo3.png";

export const LoginForm = ({ onToggleForm, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login, loading, error, clearError } = useLogin();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(formData);

    if (result.success) {
      if (onLoginSuccess) {
        onLoginSuccess(result.data.userDetails);
      }
    } else {
      console.error("Error en login:", result.error);
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={fondoLogin}
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay for better contrast if image is too bright */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-12 m-4 text-center">
        {/* Header / Brand */}
        <div className="mb-8">
          <h1 className="text-xl font-medium tracking-widest text-slate-500 uppercase mb-4">
            BELLA AMORE
          </h1>
          <h2 className="text-4xl font-serif text-CarissaFREE-900 tracking-wide">
            Bienvenido
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          {error && (
            <div className="p-2 text-sm text-red-600 bg-red-50 rounded border border-red-100 text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors"
                placeholder="Usuario o Email"
                autoComplete="username"
                required
                disabled={loading}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors"
                placeholder="Contraseña"
                autoComplete="current-password"
                required
                disabled={loading}
              />
            </div>
            <div className="flex justify-end mt-1">
              <button type="button" className="text-sm text-indigo-500 hover:text-indigo-700">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#FF8FAB] hover:bg-[#ff7a9c] text-white font-bold text-lg shadow-md transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-70"
            >
              {loading ? "Entrando..." : "Iniciar Sesión"}
            </button>
          </div>

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={onToggleForm}
              className="text-sm text-indigo-500 hover:text-indigo-700 font-medium"
            >
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
