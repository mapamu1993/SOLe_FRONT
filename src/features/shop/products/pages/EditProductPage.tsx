import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { useEditProductMutation } from "../hooks/useProductsMutations";
import {
  createProductSchema,
  type CreateProductFields,
} from "../validators/ProductSchema";
import { getProductByIdService } from "../services/productServices";
import { ProductFormDesign } from "../components/ProductoFormDesign";
import { IMAGE_URL } from "../../../../config/constants";

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const [file, setFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadError, setLoadError] = useState("");

  const { mutate, isPending, error: mutationError } = useEditProductMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateProductFields>({
    resolver: zodResolver(createProductSchema),
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const productData = await getProductByIdService(id);

        if (productData) {
          setValue("name", productData.name);
          setValue("description", productData.description);
          setValue("price", productData.price);
          setValue("stock", productData.stock);
          setValue("category", productData.category);
          setCurrentImage(productData.image);
        }
      } catch (error) {
        setLoadError("No pudimos cargar el producto para editar.");
      } finally {
        setLoadingData(false);
      }
    };
    fetchProduct();
  }, [id, setValue]);

  const onSubmit = (data: CreateProductFields) => {
    if (!id) return;
    mutate({ id, data, file });
  };

  const formattedExistingImage = (() => {
    if (!currentImage) return null;

    if (currentImage.startsWith("http")) {
      return currentImage;
    }

    if (
      currentImage.includes("/") ||
      currentImage.match(/\.(jpeg|jpg|png|webp)$/i)
    ) {
      return `${IMAGE_URL}/uploads/products/${currentImage}`;
    }

    return null;
  })();

  if (loadingData)
    return (
      <div className="flex h-screen items-center justify-center bg-[#EBECE2]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#333D29] border-t-transparent"></div>
      </div>
    );

  if (loadError)
    return (
      <div className="p-8 text-center text-red-600 font-bold">{loadError}</div>
    );

  const errorMessage = mutationError?.response?.data?.message || "";

  return (
    <ProductFormDesign
      register={register}
      errors={errors}
      isSubmitting={isPending}
      onSubmit={handleSubmit(onSubmit)}
      pageTitle="Editando Producto"
      buttonText="Guardar Cambios"
      serverError={errorMessage}
      onFileChange={(e) => setFile(e.target.files?.[0] || null)}
      currentFile={file}
      existingImageUrl={formattedExistingImage}
    />
  );
};

export default EditProductPage;