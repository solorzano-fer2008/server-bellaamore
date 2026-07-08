import React from 'react';
import { Navigate } from 'react-router-dom';

export const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
        return <Navigate to="/login" />;
    }
    
    const user = JSON.parse(userStr);
    
    if (user.role !== 'ADMIN_ROLE') {
        return <Navigate to="/" />;
    }
    
    return children;
};
