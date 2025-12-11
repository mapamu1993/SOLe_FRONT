import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
// CORRECCIÓN 1: Importar el esquema (valor) además del tipo
import { profileSchema, type ProfileFields } from "../validators/auth.schema";
import { useAuth } from "../context/auth.context";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { getUserProfileUrl } from "../utils/userUtil";

const UpdateProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mutate, isPending } = useUpdateProfile(); // isPending puede usarse para deshabilitar el botón
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFields>({
    resolver: zodResolver(profileSchema), // Ahora esto funcionará
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
      const initialUrl = getUserProfileUrl(user.profilePicture);
      if (initialUrl) setPreviewUrl(initialUrl);
    }
  }, [user, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      const originalUrl = getUserProfileUrl(user?.profilePicture);
      setPreviewUrl(originalUrl || null);
    }
  };

  const onSubmit = (data: ProfileFields) => {
    mutate(
      {
        data,
        file,
      },
      {
        onSuccess: () => {
          navigate("/profile");
        },
      }
    );
  };

  return (
    <div>
      <h1>Update Profile</h1>

      {/* Opcional: Mostrar previsualización */}
      {previewUrl && <img src={previewUrl} alt="Preview" width={100} />}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* CORRECCIÓN 2: Mostrar feedback visual */}
        <div>
          <label>Username</label>
          <input type="text" {...register("username")} />
          {errors.username && (
            <p style={{ color: "red" }}>{errors.username.message}</p>
          )}
        </div>

        <div>
          <label>Name</label>
          <input type="text" {...register("name")} />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div>
          <label>Last Name</label>
          <input type="text" {...register("lastName")} />
          {errors.lastName && (
            <p style={{ color: "red" }}>{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label>Address</label>
          <input type="text" {...register("address")} />
          {errors.address && (
            <p style={{ color: "red" }}>{errors.address.message}</p>
          )}
        </div>

        <div>
          <label>Phone</label>
          <input type="text" {...register("phone")} />
          {errors.phone && (
            <p style={{ color: "red" }}>{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label>Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
