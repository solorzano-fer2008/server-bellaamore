import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { loginUser } from '../services/apiService';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const result = await loginUser(credentials);

      if (result.error) {
        setError(result.message);
        toast.error(result.message || 'Error al iniciar sesión');
        setLoading(false);
        return { success: false, error: result.message };
      }

      // Guardar token y datos del usuario en localStorage
      if (result.userDetails?.token) {
        localStorage.setItem('token', result.userDetails.token);
      }
      if (result.userDetails) {
        localStorage.setItem('user', JSON.stringify(result.userDetails));
      }

      toast.success('¡Bienvenido de vuelta!');
      setLoading(false);
      return { success: true, data: result };
    } catch {
      const errorMessage = 'Error inesperado al iniciar sesión';
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const clearError = () => setError(null);

  return {
    login,
    loading,
    error,
    clearError
  };
};