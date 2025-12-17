import axiosClient from "../../../../api/axios.client";
import { API_ROUTES } from "../../../../config/constants";
import { type Product } from "../types/productTypes";

// ⚠️ AÑADE 'export' AQUÍ
export interface CreateProductParams {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: File;
}

export const getAllProductsService = async (): Promise<Product[]> => {
  const { data } = await axiosClient.get(API_ROUTES.PRODUCTS);
  return data.data.products;
};

export const createProductService = async (
  params: CreateProductParams
): Promise<Product> => {
  const formData = new FormData();
  formData.append("name", params.name);
  formData.append("description", params.description);
  formData.append("price", String(params.price));
  formData.append("stock", String(params.stock));
  formData.append("category", params.category);
  formData.append("image", params.image); 

  const { data } = await axiosClient.post(API_ROUTES.PRODUCTS, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const getProductByIdService = async (id: string): Promise<Product> => {
  const { data } = await axiosClient.get(`${API_ROUTES.PRODUCTS}/${id}`);
  return data.data.product; 
};

// AÑADE 'export' AQUÍ TAMBIÉN
export interface UpdateProductParams {
  id: string;
  data: Partial<CreateProductParams>;
  file?: File | null;
}

export const updateProductService = async ({
  id,
  data,
  file,
}: UpdateProductParams): Promise<Product> => {
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  if (data.price) formData.append("price", String(data.price));
  if (data.stock) formData.append("stock", String(data.stock));
  if (data.category) formData.append("category", data.category);
  
  if (file) {
    formData.append("image", file);
  }

  const { data: response } = await axiosClient.patch(
    `${API_ROUTES.PRODUCTS}/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
};

export const deleteProductService = async (id: string): Promise<void> => {
  await axiosClient.delete(`${API_ROUTES.PRODUCTS}/${id}`);
};