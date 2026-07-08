import React from 'react';
import { AuthModal } from './AuthModal';

export const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return <AuthModal />;
    }
    
    return children;
};
