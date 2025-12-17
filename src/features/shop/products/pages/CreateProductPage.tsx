import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProductSchema,
  type CreateProductFields,
} from "../validators/ProductSchema";
import { useCreateProductMutation } from "../hooks/useProductsMutations";
import { ProductFormDesign } from "../components/ProductoFormDesign";

const CreateProductPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [localError, setLocalError] = useState("");
  const { mutate, isPending } = useCreateProductMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
      stock: 0,
    },
  });

  const onSubmit: SubmitHandler<CreateProductFields> = (data) => {
    setLocalError("");
    if (!file) {
      setLocalError("La imagen es obligatoria.");
      return;
    }
    mutate({ ...data, image: file });
  };

  return (
    <ProductFormDesign
      register={register as any}
      errors={errors as any}
      isSubmitting={isPending}
      onSubmit={handleSubmit(onSubmit)}
      pageTitle="Nuevo Producto"
      buttonText="Crear Producto"
      serverError={localError}
      onFileChange={(e) => setFile(e.target.files?.[0] || null)}
      currentFile={file}
    />
  );
};

export default CreateProductPage;
