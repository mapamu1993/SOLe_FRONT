import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileService } from "../services/authService";
import { useAuth } from "../context/auth.context";
import type { ProfileFields } from "../validators/authSchema";
import { useSnackbar } from "notistack"; 

type UpdateProfileParams = {
  data: ProfileFields;
  file: File | null;
};

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar(); // Usar hook

  return useMutation<any, Error, UpdateProfileParams>({
    mutationFn: ({ data, file }) => updateProfileService(data, file),
    
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });
      login(data.user);
      
      enqueueSnackbar("Perfil actualizado correctamente", { variant: "success" });
    },

    onError: (error: any) => {
      const msg = error.response?.data?.message || "Hubo un error al actualizar el perfil";
      console.error("Error updating profile:", error);

      enqueueSnackbar(msg, { variant: "error" });
    },
  });
};

export default useUpdateProfile;