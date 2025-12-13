//importamos el hook para que el HTTP nos enseñe los datos de un blog en particular al hacerle click
import { useBlogByIdQuery } from "../hooks/useBlogsQuery";
//useParams para leer los parametros dinamicos de la url, como id de productos etc
import { Link as RouterLink, useParams } from "react-router-dom";

//declaramos la constante de la pagina
const BlogDetailsPage = () => {
  //extraemos el id de la url en la que estamos; para que typescript lo reconozca se pone de esa forma antes de los () de la funcion
  const { id } = useParams<{ id: string }>();
  //usamos el hook para obtener los datos del blog
  const { data: blog } = useBlogByIdQuery(id);

  //hacemos el procesamiento del contenido: preparar html para recibirlo
  const content = { __html: blog?.content.replace(/\n/g, "<br />") };

  {//OJO: NO USEIS ESTOS RETURNS. SON PARA QUE SEPAIS QUE ESTAN AQUI.
  //USAD LO QUE FALTE DE ARRIBA AL HACER EL FORMULARIO ETC.
  //IMPORTANTE TAMBIÉN: HAY QUE ENRUTAR TODAS LAS PAGINAS EN EL APP
  //SI NO LO HACEIS NO VAIS A VER NADAAAAAA!!!!
  return (
    <div>
      <h1>{blog?.title}</h1>
      <div dangerouslySetInnerHTML={content} />
    </div>
  );
};}

export default BlogDetailsPage;
