import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProductSchema,
  type CreateProductFields,
} from "../validators/productSchema";
import { useCreateProductMutation } from "../hooks/useProductMutations";

const CreateProductPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [localError, setLocalError] = useState("");
  const { mutate, isPending } = useCreateProductMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFields>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = (data: CreateProductFields) => {
    setLocalError("");
    if (!file) {
      setLocalError("La imagen es obligatoria.");
      return;
    }
    // Combinamos los datos del formulario con el archivo del estado local
    mutate({ ...data, image: file });
  };

  return (
    <div>
      <h1>Nuevo Producto</h1>
      {localError && <p style={{ color: "red" }}>{localError}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        {/* Nombre */}
        <div>
          <label>Nombre:</label>
          <input type="text" {...register("name")} />
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label>Descripción:</label>
          <textarea {...register("description")} />
          {errors.description && (
            <span style={{ color: "red" }}>{errors.description.message}</span>
          )}
        </div>

        {/* Precio */}
        <div>
          <label>Precio:</label>
          <input type="number" step="0.01" {...register("price")} />
          {errors.price && (
            <span style={{ color: "red" }}>{errors.price.message}</span>
          )}
        </div>

        {/* Stock */}
        <div>
          <label>Stock:</label>
          <input type="number" {...register("stock")} />
          {errors.stock && (
            <span style={{ color: "red" }}>{errors.stock.message}</span>
          )}
        </div>

        {/* Categoría */}
        <div>
          <label>Categoría:</label>
          <input type="text" {...register("category")} />
          {errors.category && (
            <span style={{ color: "red" }}>{errors.category.message}</span>
          )}
        </div>

        {/* Imagen (Input File Nativo) */}
        <div>
          <label>Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? "Guardando..." : "Crear Producto"}
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
