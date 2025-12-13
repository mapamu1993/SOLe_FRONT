import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import UserProfilePage from "../features/auth/pages/UserProfilePage";
import UpdateProfilePage from "../features/auth/pages/UpdateProfilePage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/pages/ResetPasswordPage";
import BlogPage from "@/features/blog/pages/BlogPage";
import CreateBlogPage from "@/features/blog/pages/CreateBlogPage";
import EditBlogPage from "@/features/blog/pages/EditBlogPage";
import BlogDetailsPage from "@/features/blog/pages/BlogDetailsPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
      <Route path="/update" element={<UpdateProfilePage />} />
      <Route path="/resetpassword" element={<ResetPasswordPage />} />
      <Route path="/blog" element={<BlogPage/>} />
      <Route path="/blogcreate" element={<CreateBlogPage/>} />
      <Route path="blogedit" element={<EditBlogPage/>} />
      <Route path="blogdetails" element={<BlogDetailsPage/>} />
    </Routes>
  );
};

export default AppRouter;
