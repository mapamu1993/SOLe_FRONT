import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../hooks/usePasswordChange";
// 1. IMPORTANTE: Traemos el contexto para saber quién es el usuario actual
import { useAuth } from "../context/auth.context"; 
import {
  changePasswordSchema,
  type ChangePasswordFields,
} from "../validators/authSchema";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const EditPasswordPage = () => {
  const navigate = useNavigate();
  // 2. Obtenemos el usuario del contexto
  const { user } = useAuth(); 
  const { mutate, isPending } = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFields>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordFields) => {
    mutate({
      current: data.currentPassword,
      newPass: data.newPassword,
    });
  };

  const handleCancel = () => {
    navigate("/profile"); 
  };

  const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#656D4A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#C2C5AA] flex items-center justify-center p-4 font-sans">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-md w-full border border-[#A4AC86] flex flex-col">
        
        {/* Banner Superior */}
        <div className="h-20 bg-gradient-to-r from-[#582F0E] to-[#7F4F24] flex items-center px-6 relative">
          <button
            type="button"
            onClick={handleCancel}
            className="text-white/80 hover:text-white font-semibold text-sm flex items-center gap-1 transition-colors bg-black/10 px-3 py-1 rounded-full hover:bg-black/20"
          >
            ← Volver
          </button>
          <h2 className="ml-auto text-white text-lg font-bold drop-shadow-md">
            Seguridad
          </h2>
        </div>

        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#333D29] mb-2">
              Cambiar Contraseña
            </h1>
            <p className="text-[#656D4A] text-sm">
              Asegúrate de elegir una contraseña segura.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            
            <input 
              type="text" 
              autoComplete="username" 
              value={user?.username || ""} 
              readOnly 
              className="hidden" 
            />

            {/* Contraseña Actual */}
            <div className="relative">
              <Label htmlFor="currentPassword" className="text-[#333D29] mb-1 block">Contraseña Actual</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("currentPassword")}
                  className="pl-10 border-[#A4AC86]"
                  // 4. AUTOCOMPLETE CORRECTO: current-password
                  autoComplete="current-password"
                />
                <div className="absolute left-3 top-2.5">
                  <LockIcon />
                </div>
              </div>
              {errors.currentPassword && (
                <p className="text-red-600 text-xs mt-1 font-medium">{errors.currentPassword.message}</p>
              )}
            </div>

            {/* Nueva Contraseña */}
            <div className="relative">
              <Label htmlFor="newPassword" className="text-[#333D29] mb-1 block">Nueva Contraseña</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("newPassword")}
                  className="pl-10 border-[#A4AC86]"
                  // 5. AUTOCOMPLETE CORRECTO: new-password
                  autoComplete="new-password"
                />
                <div className="absolute left-3 top-2.5">
                  <LockIcon />
                </div>
              </div>
              {errors.newPassword && (
                <p className="text-red-600 text-xs mt-1 font-medium">{errors.newPassword.message}</p>
              )}
            </div>

            {/* Confirmar Nueva Contraseña */}
            <div className="relative">
              <Label htmlFor="confirmNewPassword" className="text-[#333D29] mb-1 block">Confirmar Nueva</Label>
              <div className="relative">
                <Input
                  id="confirmNewPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmNewPassword")}
                  className="pl-10 border-[#A4AC86]"
                  // 6. AUTOCOMPLETE: new-password (también aquí)
                  autoComplete="new-password"
                />
                <div className="absolute left-3 top-2.5">
                  <LockIcon />
                </div>
              </div>
              {errors.confirmNewPassword && (
                <p className="text-red-600 text-xs mt-1 font-medium">{errors.confirmNewPassword.message}</p>
              )}
            </div>

            {/* Botones */}
            <div className="flex flex-col gap-3 pt-4 mt-6 border-t border-[#C2C5AA]">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#582F0E] hover:bg-[#7F4F24] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-200 disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {isPending ? (
                   <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"/>
                    Actualizando...
                   </>
                ) : "Guardar Nueva Contraseña"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="w-full bg-white text-[#582F0E] border-2 border-[#582F0E] hover:bg-[#EBECE2] font-bold py-3 px-4 rounded-xl transition-all duration-200"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPasswordPage;