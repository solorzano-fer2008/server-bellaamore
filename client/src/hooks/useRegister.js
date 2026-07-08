import { useState } from 'react';
import toast from 'react-hot-toast';
import { registerUser } from '../services/apiService';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      console.log('Datos a enviar:', userData);
      
      const result = await registerUser(userData);
      console.log('Resultado del registro:', result);

      if (result.error) {
        setError(result.message);
        toast.error(result.message || 'Error al registrar usuario');
        setLoading(false);
        return { success: false, error: result.message };
      }

      // Guardar token y datos del usuario en localStorage si vienen en la respuesta
      if (result.userDetails?.token) {
        localStorage.setItem('token', result.userDetails.token);
      }
      if (result.userDetails) {
        localStorage.setItem('user', JSON.stringify(result.userDetails));
      }

      toast.success('¡Registro exitoso! Bienvenido a la comunidad BELLA AMORE!');
      setLoading(false);
      return { success: true, data: result };
    } catch (error) {
      console.error('Error en useRegister:', error);
      const errorMessage = 'Error inesperado al registrar usuario';
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const clearError = () => setError(null);

  return {
    register,
    loading,
    error,
    clearError
  };
};