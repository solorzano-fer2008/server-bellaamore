import React, { useState } from 'react';
import { FiEdit, FiSave, FiX } from 'react-icons/fi';

export const AdminControls = ({ 
  isEditing, 
  onToggleEdit, 
  onSave, 
  onCancel,
  position = 'top-left' 
}) => {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  return (
    <div className={`fixed z-50 ${positionClasses[position]} flex gap-2`}>
      {!isEditing ? (
        <button
          onClick={onToggleEdit}
          className="bg-white hover:bg-gray-100 text-gray-800 p-5 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 border-2 border-gray-200"
          title="Activar modo edición"
        >
          <FiEdit className="text-3xl" />
          <span className="hidden md:inline font-semibold text-lg">Editar</span>
        </button>
      ) : (
        <>
          <button
            onClick={onSave}
            className="bg-white hover:bg-gray-100 text-green-600 p-5 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 border-2 border-green-200"
            title="Guardar cambios"
          >
            <FiSave className="text-3xl" />
            <span className="hidden md:inline font-semibold text-lg">Guardar</span>
          </button>
          <button
            onClick={onCancel}
            className="bg-white hover:bg-gray-100 text-red-600 p-5 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 border-2 border-red-200"
            title="Cancelar edición"
          >
            <FiX className="text-3xl" />
            <span className="hidden md:inline font-semibold text-lg">Cancelar</span>
          </button>
        </>
      )}
    </div>
  );
};
