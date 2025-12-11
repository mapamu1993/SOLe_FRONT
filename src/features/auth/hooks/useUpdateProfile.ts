import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileService } from "../services/authService";
import { useAuth } from "../context/auth.context";
import type { ProfileFields } from "../validators/auth.schema";

type UpdateProfileParams = {
  data: ProfileFields;
  file: File | null;
};

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();
  return useMutation<any, Error, UpdateProfileParams>({
    mutationFn: ({ data, file }) => updateProfileService(data, file),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });
      login(data.user);
    },
    onError: (error: any) => {
      error.response?.data?.message || "Hubo un error al actualizar el perfil";
    },
  });
};

export default useUpdateProfile;
