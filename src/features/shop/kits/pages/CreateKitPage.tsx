import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateKitMutation } from "../hooks/useKitsMutation";
import { KitFormDesign } from "../components/KitFormDesign";

interface CreateKitFields {
  name: string;
  description: string;
  price: number;
  isRecommended: boolean;
  featuresString: string;
}

const CreateKitPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [localError, setLocalError] = useState("");
  
  const { mutate, isPending } = useCreateKitMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateKitFields>({
    defaultValues: {
      price: 0,
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
    formData.append("isRecommended", String(data.isRecommended));
    formData.append("image", file);

    const featuresArray = data.featuresString.split(",").map(f => f.trim()).filter(f => f !== "");
    featuresArray.forEach(feature => formData.append("features[]", feature));

    mutate(formData);
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