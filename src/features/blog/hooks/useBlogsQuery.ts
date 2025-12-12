//hook princpila, libreria de react, cache cargas 
import { useQuery } from "@tanstack/react-query";
//importamos los servicios
import { getAllBlogsService, getBlogByIdService} from "../services/blogService";
//importamos el tipo donde se define la interfaz del blog
import { type Blog } from "../types/blogtypes";


//se define y exportamos la funcion constante y este ayda a que react lo reconoce como un custom hook
export const useBlogsQuery = () => {
    //el return ejecuta esa funcion donde le hemos mandado dos parametros, el primero si esta bien y el segundo si no me envia un erro
    //queryKey es como una caja donde se almacena la info y te la envia, y te lo devuelve en el tipo que este por defecto (blog)
    return useQuery <Blog[], Error> ({
        queryKey: ["blogs"],
        //funcion que se ejecuta
        queryFn: getAllBlogsService,
    });
};

//es lo mismo salvo que tiene la diferencia que nosotros le definimos algo, tambien puede ser undefined
export const useBlogByIdQuery = (id: string | undefined) => {
    return useQuery <Blog, Error>({
        //te da solo el id de los blogs asi tambien sirve con los parametros que hayas elegido
        queryKey:["blog", id],
        // id! ignora los undefined y te trae los que si que estan
        queryFn: () => getBlogByIdService (id!),
        //convierte la variable del id a un booleano si hay true si no false
        enabled: !!id,
    });
};