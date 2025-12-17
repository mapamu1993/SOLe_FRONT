import { useQuery } from "@tanstack/react-query";
import {
  getAllBlogsService,
  getBlogByIdService,
} from "../services/blogService";
import { type Blog } from "../types/blogTypes";


// Hook para obtener todos los blogs
export const useBlogsQuery = () => {
  return useQuery<Blog[], Error>({
    queryKey: ["blogs"],
    queryFn: getAllBlogsService,
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

// Hook para obtener un blog concreto por ID
export const useBlogByIdQuery = (id: string | undefined) => {
  return useQuery<Blog, Error>({
    queryKey: ["blog", id],
    queryFn: () => getBlogByIdService(id!),
    enabled: !!id,
    staleTime: 0,
  });
};