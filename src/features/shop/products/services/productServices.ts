import axiosClient from "../../../../api/axios.client";
import { API_ROUTES } from "../../../../config/constants";
import { type Product } from "../types/productTypes";

interface CreateProductParams {
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
  formData.append("productImage", params.image); 

  const { data } = await axiosClient.post(API_ROUTES.PRODUCTS, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const getProductByIdService = async (id: string): Promise<Product> => {
  const { data } = await axiosClient.get(`${API_ROUTES.PRODUCTS}/${id}`);
  return data.data.product; 
};

export const updateProductService = async (
  id: string,
  params: Omit<CreateProductParams, "image">,
  file: File | null
): Promise<Product> => {
  const formData = new FormData();
  formData.append("name", params.name);
  formData.append("description", params.description);
  formData.append("price", String(params.price));
  formData.append("stock", String(params.stock));
  formData.append("category", params.category);

  if (file) {
    formData.append("productImage", file);
  }

  const { data } = await axiosClient.patch(`${API_ROUTES.PRODUCTS}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Servicio para eliminar
export const deleteProductService = async (id: string) => {
  const { data } = await axiosClient.delete(`${API_ROUTES.PRODUCTS}/${id}`);
  return data;
};