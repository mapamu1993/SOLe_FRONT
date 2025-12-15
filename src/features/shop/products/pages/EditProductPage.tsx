import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProductSchema,
  type CreateProductFields,
} from "../validators/ProductSchema";
import { useProductByIdQuery } from "../hooks/useProductsQuery";
import { useUpdateProductMutation } from "../hooks/useProductsMutations";
import { ProductFormDesign } from "../components/ProductoFormDesign"; // Ojo al nombre si es ProductoFormDesign
import { IMAGE_URL } from "../../../../config/constants";

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);

  const { data: product, isLoading: isLoadingData } = useProductByIdQuery(
    id || ""
  );

  const { mutate, isPending } = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    setValue, // Necesario para pre-rellenar
    formState: { errors },
  } = useForm<CreateProductFields>({
    resolver: zodResolver(createProductSchema),
  });

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("stock", product.stock);
      setValue("category", product.category);
    }
  }, [product, setValue]);

  const onSubmit = (data: CreateProductFields) => {
    if (id) {
      mutate({ id, data, file });
    }
  };

  const currentImageUrl = product?.image
    ? product.image.startsWith("http")
      ? product.image
      : `${IMAGE_URL}/uploads/products/${product.image}`
    : null;

  if (isLoadingData)
    return (
      <div className="p-8 text-center">Cargando datos del producto...</div>
    );

  return (
    <ProductFormDesign
      register={register}
      errors={errors}
      isSubmitting={isPending}
      onSubmit={handleSubmit(onSubmit)}
      pageTitle="Editar Producto"
      buttonText="Guardar Cambios"
      onFileChange={(e) => setFile(e.target.files?.[0] || null)}
      currentFile={file}
    />
  );
};

export default EditProductPage;
