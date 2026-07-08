import React, { useState } from "react";

export const CommentModal = ({ open, onClose, onSubmit, loading }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(content);
    setContent("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/20 p-8 md:p-10 scale-in-center">
        <h3 className="text-3xl font-serif font-bold mb-6 text-gray-800 text-center uppercase tracking-tight">Agregar comentario</h3>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="bg-white/40 p-4 rounded-2xl border border-white/40">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-5 py-4 bg-white/60 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800 placeholder-gray-400 transition-all text-lg shadow-inner resize-none"
              rows={4}
              maxLength={300}
              placeholder="Escribe tu comentario aquí..."
              required
            />
            <div className="text-right mt-2 text-xs font-semibold text-gray-500 uppercase tracking-widest">
              {content.length} / 300
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 rounded-xl border border-gray-300 text-gray-600 font-bold hover:bg-gray-50 transition-all uppercase tracking-widest text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-lg shadow-purple-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-sm disabled:opacity-50"
            >
              {loading ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
