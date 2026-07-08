import React from "react";
import { LuTriangleAlert, LuX } from "react-icons/lu";

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-in zoom-in duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors"
        >
          <LuX className="text-xl" />
        </button>

        <div className="p-8 text-center">
          {/* Icon Container */}
          <div className="mx-auto w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mb-6 border border-rose-500/20">
            <LuTriangleAlert className="text-4xl text-rose-500" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
            {title || "¿Estás seguro?"}
          </h3>

          <p className="text-zinc-400 text-sm leading-relaxed mb-8 px-4">
            {message ||
              "Esta acción no se puede deshacer. Los datos se eliminarán permanentemente de nuestros servidores."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all border border-zinc-700"
            >
              Cancelar
            </button>

            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-6 py-3.5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-rose-900/20"
            >
              Sí, Eliminar
            </button>
          </div>
        </div>

        {/* Bottom Banner Decorative */}
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"></div>
      </div>
    </div>
  );
};