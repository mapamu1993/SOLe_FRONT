import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileService } from "../services/authService";
import { useAuth } from "../context/auth.context";
import type { ProfileFields } from "../validators/authSchema";
import { useSnackbar } from "notistack"; // 1. IMPORTAR ESTO

type UpdateProfileParams = {
  data: ProfileFields;
  file: File | null;
};

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar(); // 2. USAR EL HOOK

  return useMutation<any, Error, UpdateProfileParams>({
    mutationFn: ({ data, file }) => updateProfileService(data, file),
    
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });
      // Actualizamos el usuario en el contexto
      login(data.user);

      // 3. TOAST DE ÉXITO
      enqueueSnackbar("Perfil actualizado correctamente", { variant: "success" });
    },

    onError: (error: any) => {
      // Capturamos el mensaje de error o ponemos uno genérico
      const msg = error.response?.data?.message || "Hubo un error al actualizar el perfil";
      console.error("Error updating profile:", error);

      // 4. TOAST DE ERROR
      enqueueSnackbar(msg, { variant: "error" });
    },
  });
};

export default useUpdateProfile;