import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/auth/LoginForm";

export const LoginPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = (user) => {
    if (onLoginSuccess) {
      onLoginSuccess(user);
    }
    navigate('/');
  };

  const handleGoToRegister = () => {
    navigate('/registro');
  };

  return (
    <LoginForm
      onToggleForm={handleGoToRegister}
      onLoginSuccess={handleLoginSuccess}
    />
  );
};
