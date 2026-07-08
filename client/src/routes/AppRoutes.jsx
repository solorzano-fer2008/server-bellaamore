import React from "react";
import { Routes, Route } from "react-router-dom";
import { Welcome } from "../components/ui/Welcome";
import { PostList } from "../components/posts/PostList";
import { PostForm } from "../components/posts/PostForm";
import { PostDetail } from "../components/posts/PostDetail";
import { EditProfile } from "../components/profile/EditProfile";
import { PromotionsPage } from "../pages/PromotionsPage";
import { MenuPage } from "../pages/MenuPage";
import { IndividualesPage } from "../pages/IndividualesPage";
import { PostresPage } from "../pages/PostresPage";
import { BebidasPage } from "../pages/BebidasPage";
import { DesayunosPage } from "../pages/DesayunosPage";
import { BrunchPage } from "../pages/BrunchPage";
import { AlmuerzosPage } from "../pages/AlmuerzosPage";
import { CenasPage } from "../pages/CenasPage";
import { UbicacionesPage } from "../pages/UbicacionesPage";
import { DomicilioPage } from "../pages/DomicilioPage";
import { ReservacionesPage } from "../pages/ReservacionesPage";
import { ProfilePage } from "../pages/ProfilePage";
import { AdminPage } from "../pages/AdminPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { AdminRoute } from "../components/auth/AdminRoute";

import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

export const AppRoutes = ({ onLoginSuccess }) => (
  <Routes>
    <Route path="/login" element={<LoginPage onLoginSuccess={onLoginSuccess} />} />
    <Route path="/registro" element={<RegisterPage onLoginSuccess={onLoginSuccess} />} />
    <Route path="/" element={<Welcome />} />
    <Route path="/publicaciones" element={<PostList />} />
    <Route path="/promociones" element={<PromotionsPage />} />
    <Route path="/menu" element={<MenuPage />} />
    <Route path="/menu/individuales" element={<IndividualesPage />} />
    <Route path="/menu/postres" element={<PostresPage />} />
    <Route path="/menu/bebidas" element={<BebidasPage />} />
    <Route path="/menu/desayunos" element={<DesayunosPage />} />
    <Route path="/menu/brunch" element={<BrunchPage />} />
    <Route path="/menu/almuerzos" element={<AlmuerzosPage />} />
    <Route path="/menu/cenas" element={<CenasPage />} />
    <Route path="/ubicaciones" element={<UbicacionesPage />} />
    <Route path="/carrito" element={<CartPage />} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/domicilio" element={<ProtectedRoute><DomicilioPage /></ProtectedRoute>} />
    <Route path="/reservaciones" element={<ProtectedRoute><ReservacionesPage /></ProtectedRoute>} />
    <Route path="/publicaciones/crear" element={<ProtectedRoute><PostForm /></ProtectedRoute>} />
    <Route path="/posts/:id" element={<PostDetail />} />
    <Route path="/perfil" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
    <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
  </Routes>
);
