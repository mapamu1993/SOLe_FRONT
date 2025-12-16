import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { usecreateKitMutation } from "../hooks/useKitsMutation";
import { KitFormDesign } from "../components/KitFormDesign";

interface CreateKitFields {
  name: string;
  description: string;
  price: number;
  level: number;
  isRecommended: boolean;
  featuresString: string;
}

const CreateKitPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState<File | null>(null);
  const [localError, setLocalError] = useState("");
  
  const { mutate, isPending } = usecreateKitMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateKitFields>({
    defaultValues: {
      price: 0,
      level: 1,
      isRecommended: false
    }
  });

  const onSubmit: SubmitHandler<CreateKitFields> = (data) => {
    setLocalError("");
    if (!file) {
      setLocalError("La imagen es obligatoria.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("level", data.level.toString());
    formData.append("isRecommended", String(data.isRecommended));
    formData.append("image", file);

    // Convertir features string a array si es necesario por el backend
    // Aquí asumimos que el backend puede recibir features como array de strings
    // Si el backend espera JSON stringified:
    const featuresArray = data.featuresString.split(",").map(f => f.trim()).filter(f => f !== "");
    featuresArray.forEach(feature => formData.append("features[]", feature));

    mutate(formData, {
        onSuccess: () => {
            enqueueSnackbar("Kit creado correctamente", { variant: "success" });
            navigate("/kits");
        },
        onError: () => {
            enqueueSnackbar("Error al crear el kit", { variant: "error" });
        }
    });
  };

  return (
    <KitFormDesign
      register={register}
      errors={errors}
      isSubmitting={isPending}
      onSubmit={handleSubmit(onSubmit)}
      pageTitle="Nuevo Kit de Equipamiento"
      buttonText="Crear Kit"
      serverError={localError}
      onFileChange={(e) => setFile(e.target.files?.[0] || null)}
      currentFile={file}
    />
  );
};

export default CreateKitPage;