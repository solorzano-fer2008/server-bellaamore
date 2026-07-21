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
          className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
          title="Activar modo edición"
        >
          <FiEdit className="text-xl" />
          <span className="hidden md:inline font-semibold">Editar</span>
        </button>
      ) : (
        <>
          <button
            onClick={onSave}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
            title="Guardar cambios"
          >
            <FiSave className="text-xl" />
            <span className="hidden md:inline font-semibold">Guardar</span>
          </button>
          <button
            onClick={onCancel}
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
            title="Cancelar edición"
          >
            <FiX className="text-xl" />
            <span className="hidden md:inline font-semibold">Cancelar</span>
          </button>
        </>
      )}
    </div>
  );
};
