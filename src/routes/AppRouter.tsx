import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import UserProfilePage from "../features/auth/pages/UserProfilePage";
import UpdateProfilePage from "../features/auth/pages/UpdateProfilePage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/profile/edit" element={<UpdateProfilePage />} />
    </Routes>
  );
};

export default AppRouter;
