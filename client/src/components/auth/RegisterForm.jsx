import { useState } from "react";
import { useRegister } from "../../hooks/useRegister";
import fondoPlato2 from "../../assets/img/postre1.png";
import pageBackground from "../../assets/img/restaurantefondo3.png";
/* For icons */
import { UserIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";

export const RegisterForm = ({ onToggleForm, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
    phone: "",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const { register, loading, error, clearError } = useRegister();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePicture") {
      setFormData(prev => ({
        ...prev,
        [name]: files[0] || null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // No enviar profilePicture ni acceptedTerms para evitar problemas
    const dataToSend = {
      name: formData.name,
      surname: formData.surname,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone
    };

    console.log("Enviando datos de registro:", dataToSend);
    const result = await register(dataToSend);

    if (result.success) {
      if (onRegisterSuccess) {
        onRegisterSuccess(result.data.userDetails);
      }
    } else {
      console.error("Error en registro:", result.error);
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center relative overflow-hidden p-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={pageBackground}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Card Container - Split Layout */}
      <div className="relative z-10 w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto md:min-h-[800px]">

        {/* Left Side - Image ( fondodeplato2 ) */}
        <div className="hidden md:flex md:w-5/12 relative bg-gray-200 flex-col">
          <img
            src={fondoPlato2}
            alt="Delicious Dish"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white z-10">
            <h2 className="text-3xl font-bold drop-shadow-lg">BELLA AMORE</h2>
            <p className="text-sm opacity-90 drop-shadow-md">Únete a nuestro restaurante gourmet para probar nuestros platillos de alta calidad</p>
          </div>

          {/* Back Button (Absolute over image on mobile/desktop) */}
          <button
            onClick={onToggleForm}
            className="absolute left-4 top-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors"
            title="Volver al Login"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-white overflow-y-auto">

          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Crear Cuenta</h2>
            <p className="text-gray-500 text-sm">Completa tus datos para comenzar a disfrutar de nuestros platillos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100 text-center">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 rounded-full border-none focus:ring-2 focus:ring-rose-400 text-gray-700 placeholder-gray-400 transition-all text-sm"
                  placeholder="Nombre"
                  autoComplete="given-name"
                  required
                  disabled={loading}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                  <UserIcon className="h-4 w-4" />
                </div>
              </div>

              {/* Surname */}
              <div className="relative">
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 rounded-full border-none focus:ring-2 focus:ring-rose-400 text-gray-700 placeholder-gray-400 transition-all text-sm"
                  placeholder="Apellidos"
                  autoComplete="family-name"
                  required
                  disabled={loading}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                  <UserIcon className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-full border-none focus:ring-2 focus:ring-rose-400 text-gray-700 placeholder-gray-400 transition-all text-sm"
                placeholder="Nombre de usuario"
                autoComplete="username"
                required
                disabled={loading}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                <UserIcon className="h-4 w-4" />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-full border-none focus:ring-2 focus:ring-rose-400 text-gray-700 placeholder-gray-400 transition-all text-sm"
                placeholder="Correo electrónico"
                autoComplete="email"
                required
                disabled={loading}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                <EnvelopeIcon className="h-4 w-4" />
              </div>
            </div>

            {/* Phone */}
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-full border-none focus:ring-2 focus:ring-rose-400 text-gray-700 placeholder-gray-400 transition-all text-sm"
                placeholder="Teléfono (Opcional)"
                autoComplete="tel"
                disabled={loading}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-full border-none focus:ring-2 focus:ring-rose-400 text-gray-700 placeholder-gray-400 transition-all text-sm"
                placeholder="Contraseña"
                autoComplete="new-password"
                required
                disabled={loading}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                <LockClosedIcon className="h-4 w-4" />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-full border-none focus:ring-2 focus:ring-rose-400 text-gray-700 placeholder-gray-400 transition-all text-sm"
                placeholder="Confirmar contraseña"
                autoComplete="new-password"
                required
                disabled={loading}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                <LockClosedIcon className="h-4 w-4" />
              </div>
            </div>

            {/* Profile Picture */}
            <div className="relative">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 ml-2">
                Foto de perfil (opcional)
              </label>
              <input
                type="file"
                name="profilePicture"
                onChange={handleInputChange}
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 cursor-pointer"
                disabled={loading}
              />
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 ml-1 pt-2">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500 cursor-pointer"
                disabled={loading}
              />
              <span className="text-xs text-gray-600">
                Acepto los <span className="font-bold cursor-pointer hover:underline">Términos y Condiciones</span>.
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || !acceptedTerms}
              className="w-full py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg shadow-lg shadow-rose-200 transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 mt-4 uppercase tracking-wider text-sm"
            >
              {loading ? "Creando cuenta..." : "Registrarme y Continuar"}
            </button>

            <div className="text-center mt-6 pt-4 border-t border-gray-100">
              <p className="text-gray-500 text-sm mb-3">
                ¿Ya tienes una cuenta?
              </p>
              <button
                type="button"
                onClick={onToggleForm}
                className="w-full py-3 rounded-full border-2 border-rose-500 text-rose-500 font-bold hover:bg-rose-50 transition-colors uppercase tracking-wider text-sm"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
