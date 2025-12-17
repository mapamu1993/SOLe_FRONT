import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFields } from "../validators/authSchema";
import { useAuth } from "../context/auth.context";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { getUserProfileUrl } from "../utils/userUtil";
import UpdateProfileDesign from "../components/UpdateProfilePageDesign";

const UpdateProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mutate, isPending } = useUpdateProfile();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFields>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      name: "",
      lastName: "",
      address: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username ?? "",
        name: user.name ?? "",
        lastName: user.lastName ?? "",
        address: user.address ?? "",
        phone: user.phone ?? "",
      });
      const initialUrl = getUserProfileUrl(user.image);
      if (initialUrl) setPreviewUrl(initialUrl);
    }
  }, [user, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      const originalUrl = getUserProfileUrl(user?.image);
      setPreviewUrl(originalUrl || null);
    }
  };

  const onSubmit = (data: ProfileFields) => {
    mutate(
      { data, file },
      {
        onSuccess: () => {
          navigate("/profile");
        },
      }
    );
  };


  const handleCancel = () => navigate("/profile");

  const handleGoHome = () => navigate("/");

  const handleChangePassword = () => {
    navigate("/editpassword", { state: { email: user?.email } });
  };

  const initial = user?.username ? user.username[0].toUpperCase() : "U";

  return (
    <UpdateProfileDesign
      register={register}
      errors={errors}
      isPending={isPending}
      previewUrl={previewUrl}
      initial={initial}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      onGoHome={handleGoHome}
      onChangePassword={handleChangePassword}
    />
  );
};

export default UpdateProfilePage;
