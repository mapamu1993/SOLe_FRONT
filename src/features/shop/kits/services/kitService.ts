import axiosClient from "../../../../api/axios.client";
import { API_ROUTES } from "../../../../config/constants";
import { type Kit } from "../../kits/types/kitTypes";

export const getAllKitsService = async (): Promise<Kit[]> => {
  const { data } = await axiosClient.get(API_ROUTES.KITS);
  return data.data.kits;
};

export const deleteKitService = async (id: string): Promise<void> => {
  await axiosClient.delete(`${API_ROUTES.KITS}/${id}`);
};

export const createKitService = async (formData: FormData): Promise<Kit> => {
  const { data } = await axiosClient.post(API_ROUTES.KITS, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data.kit;
};

export const getKitByIdService = async (id: string): Promise<Kit> => {
  const { data } = await axiosClient.get(`${API_ROUTES.KITS}/${id}`);
  return data.data.kit;
};

// CORRECCIÓN: Dos argumentos separados (id, formData)
export const updateKitService = async (
  id: string,
  formData: FormData
): Promise<Kit> => {
  const { data } = await axiosClient.patch(
    `${API_ROUTES.KITS}/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data.data.kit;
};

export interface KitRequestData {
  kitName: string;
  name: string;
  email: string;
  message?: string;
}

export const sendKitRequestService = async (
  data: KitRequestData
): Promise<any> => {
  const response = await axiosClient.post(
    `${API_ROUTES.KIT_REQUESTS}/request-info`,
    data
  );
  return response.data;
};
