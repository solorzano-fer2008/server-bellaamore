import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { updateUserService } from '../services/apiService';

export const useUpdateUser = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateUser = async (data) => {
        setIsLoading(true);
        const response = await updateUserService(data);
        setIsLoading(false);

        if (response.error) {
            toast.error(response.message);
            return null;
        }

        toast.success(response.message);

        // Actualizar usuario en localStorage
        if (response.userDetails) {
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            const newUserData = { ...currentUser, ...response.userDetails };
            // Asegurar que el token se mantenga si no viene en la respuesta (que no viene)
            if (currentUser.token) newUserData.token = currentUser.token;

            localStorage.setItem('user', JSON.stringify(newUserData));
            return newUserData;
        }

        return response.userDetails;
    }

    return {
        updateUser,
        isLoading
    }
}
