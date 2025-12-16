import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useKitByIdQuery } from "../hooks/useKitsQuery";
import { useUpdateKitsMutation } from "../hooks/useKitsMutation";
import { KitFormDesign } from "../components/KitFormDesign";
import { getImageUrl } from "../../../../utils/imageUtil";

interface EditKitFields {
  name: string;
  description: string;
  price: number;
  level: number;
  isRecommended: boolean;
  featuresString: string;
}

const EditKitPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  const [file, setFile] = useState<File | null>(null);
  
  const { data: kit, isLoading: isLoadingKit } = useKitByIdQuery(id || "");
  const { mutate, isPending } = useUpdateKitsMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditKitFields>();

  // Cargar datos iniciales
  useEffect(() => {
    if (kit) {
      setValue("name", kit.name);
      setValue("description", kit.description);
      setValue("price", kit.price);
      setValue("level", kit.level);
      setValue("isRecommended", kit.isRecommended);
      setValue("featuresString", kit.features ? kit.features.join(", ") : "");
    }
  }, [kit, setValue]);

  const onSubmit: SubmitHandler<EditKitFields> = (data) => {
    if (!id) return;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("level", data.level.toString());
    formData.append("isRecommended", String(data.isRecommended));
    
    if (file) {
      formData.append("image", file);
    }

    const featuresArray = data.featuresString.split(",").map(f => f.trim()).filter(f => f !== "");
    featuresArray.forEach(feature => formData.append("features[]", feature));

    mutate({ id, formData }, {
        onSuccess: () => {
            enqueueSnackbar("Kit actualizado correctamente", { variant: "success" });
            navigate("/kits");
        },
        onError: () => {
            enqueueSnackbar("Error al actualizar el kit", { variant: "error" });
        }
    });
  };

  if (isLoadingKit) {
     return <div className="text-center py-20">Cargando datos del kit...</div>;
  }

  return (
    <KitFormDesign
      register={register}
      errors={errors}
      isSubmitting={isPending}
      onSubmit={handleSubmit(onSubmit)}
      pageTitle={`Editar: ${kit?.name}`}
      buttonText="Guardar Cambios"
      onFileChange={(e) => setFile(e.target.files?.[0] || null)}
      currentFile={file}
      currentImageUrl={kit ? getImageUrl(kit.image) : undefined}
    />
  );
};

export default EditKitPage;
