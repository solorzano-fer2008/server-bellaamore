import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../../hooks/useCreatePost";
import { toast } from "react-hot-toast";
import backgroundImage from '../../assets/img/restaurantefondo3.png';
import { FaStar } from "react-icons/fa";

import { getImageUrl } from "../../utils/getImage";

export const PostForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  const { createPost, loading } = useCreatePost();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserDetails(user);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createPost({ title, content, rating });
    if (result?.error) {
      toast.error(result.message || "Error al crear comentario");
    } else {
      toast.success("¡Comentario creado exitosamente!");
      navigate("/publicaciones");
    }
  };

  const userProfileImage = userDetails.profilePicture
    ? getImageUrl(userDetails.profilePicture)
    : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat overflow-hidden relative text-left"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="relative z-10 w-full max-w-2xl bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/20 text-left">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 uppercase tracking-tight">Crear un comentario</h2>
            <button 
                onClick={() => navigate("/publicaciones")}
                className="px-6 py-2 bg-gray-800 hover:bg-black text-white text-xs font-bold rounded-full transition-all uppercase tracking-widest shadow-lg shadow-black/20"
            >
                Ver Comentarios
            </button>
        </div>

        <div className="flex items-center space-x-4 mb-8">
          <img
            src={userProfileImage}
            alt="User"
            className="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover"
          />
          <div className="text-left">
            <p className="text-gray-600 text-lg">
              Comentando como <span className="font-bold text-gray-900">{userDetails.name || 'Usuario'}</span>
            </p>
            <div className="flex space-x-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`w-6 h-6 transition-all duration-200 cursor-pointer ${(hoverRating || rating) >= star ? 'text-yellow-400 fill-current scale-110' : 'text-gray-300'
                    }`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="text-gray-700 text-xl font-medium mb-6 text-center">¿Cómo calificarías tu experiencia?</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white/40 p-6 rounded-2xl border border-white/40">
            <div className="mb-6">
              <label className="block text-gray-800 font-bold mb-2 text-lg">Título</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-5 py-4 bg-white/60 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800 placeholder-gray-400 transition-all text-lg shadow-inner"
                placeholder='Ej: "Excelente atención y sabor"'
                required
              />
            </div>

            <div>
              <label className="block text-gray-800 font-bold mb-2 text-lg">Contenido</label>
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-5 py-4 bg-white/60 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800 placeholder-gray-400 transition-all text-lg shadow-inner"
                  rows={5}
                  maxLength={300}
                  placeholder="Cuéntanos qué te gustó, qué mejorarías o si volverías."
                  required
                />
                <div className="absolute bottom-4 right-4 text-gray-500 text-sm font-medium">
                  {content.length} / 300
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 font-medium mb-6 italic">¡Tus comentarios nos ayudan a mejorar!</p>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-5 rounded-2xl font-bold text-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/30 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Publicando..." : "Publicar comentario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
