import axiosClient from "../../../api/axios.client";
import { API_ROUTES } from "../../../config/constants";
import { type CreateBlogFields } from "../validators/blogSchema";
import { type Blog } from "../types/blogTypes";


export const getAllBlogsService = async (): Promise<Blog[]> => {
  const response = await axiosClient.get(API_ROUTES.BLOGS);
  return response.data.data.blogs;
};

export const getBlogByIdService = async (id: string): Promise<Blog> => {
  const response = await axiosClient.get(`${API_ROUTES.BLOGS}/${id}`);
  return response.data.data.blog; 
};

export const createBlogService = async (data: CreateBlogFields, file: File) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("blogImage", file);

  const response = await axiosClient.post(API_ROUTES.BLOGS, formData);
  return response.data;
};

export const editBlogService = async (
  id: string,
  data: CreateBlogFields,
  file: File | null
) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  if (file) {
    formData.append("blogImage", file);
  }

  const response = await axiosClient.patch(
    `${API_ROUTES.BLOGS}/${id}`,
    formData
  );
  return response.data;
};

export const deleteBlogService = async (id: string) => {
  const response = await axiosClient.delete(`${API_ROUTES.BLOGS}/${id}`);
  return response.data;
};
