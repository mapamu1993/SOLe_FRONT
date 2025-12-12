import axiosClient from "../../../api/axios.client";
import { type CreateBlogFields} from "../validators/blogSchema";
import { type Blog } from '../types/blogtypes';


//obtener Blog pidiendo a axios que haga la llamada a http al servidor y envie la respuesta(siempre que entre en blog llamara a esta constante)
export const getAllBlogsService = async() : Promise <Blog[]> =>{
    const response = await axiosClient.get("/blogs");
    return response.data.data.blogs;
};

//obtener blog por ID 
export const getBlogByIdService = async (id: string): Promise <Blog> =>{
    const response = await axiosClient.get(`/blogs/${id}`);
    return response.data.data.blogs;
};

//esto es para crear Blog
export const createBlogService = async (data: CreateBlogFields, file: File)=>{
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("blogImage", file);
    const response = await axiosClient.post ("/blogs", formData,);
    return response.data;
};

//esto te permite editar el blog
export const editBlogService = async (
    id: string,
    data:CreateBlogFields,
    file: File|null)=>{
    const formData = new FormData();
    formData.append("title",data.title);
    formData.append("content", data.content);
    if(file){
        formData.append("blogImage",file)};
    const response = await axiosClient.patch(`/blogs/${id}`, formData,
    );
    return response.data;
};

export const deleteBlogService = async (id:string)=>{
    const response = await axiosClient.delete(`/blogs/${id}`);
    return response.data;
};