import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import UserProfilePage from "../features/auth/pages/UserProfilePage";
import UpdateProfilePage from "../features/auth/pages/UpdateProfilePage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/pages/ResetPasswordPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
<<<<<<< HEAD
      <Route path="/profile/edit" element={<UpdateProfilePage />} />
=======
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
      <Route path="/update" element={<UpdateProfilePage />} />
      <Route path="/resetpassword" element={<ResetPasswordPage />} />
>>>>>>> a51d09307552df3d844b05aef8c6f1e391e129c7
    </Routes>
  );
};

export default AppRouter;
