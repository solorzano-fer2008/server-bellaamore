import React from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/auth/RegisterForm";

export const RegisterPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const handleRegisterSuccess = (user) => {
    if (onLoginSuccess) {
      onLoginSuccess(user);
    }
    navigate('/');
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <RegisterForm
      onToggleForm={handleGoToLogin}
      onRegisterSuccess={handleRegisterSuccess}
    />
  );
};
