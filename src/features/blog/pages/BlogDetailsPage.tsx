// 1. IMPORTACIONES
import { useBlogByIdQuery } from "../hooks/useBlogsQuery";
import { useParams } from "react-router-dom"; // Quité RouterLink porque no se usaba en este trozo

// 2. DEFINICIÓN DEL COMPONENTE
const BlogDetailsPage = () => {
  // A. Extraer el ID de la URL
  // Le decimos a TypeScript que el parámetro 'id' será un texto (string)
  const { id } = useParams<{ id: string }>();

  // B. Pedir los datos usando ese ID
  // Si 'id' es undefined, la query esperará (o saltará error según tu config), 
  // pero normalmente aquí 'id' ya tiene valor.
  const { data: blog } = useBlogByIdQuery(id || ""); 

  // C. Preparar el contenido HTML (Evitamos error si 'blog' aún no ha llegado con el '?')
  // Reemplazamos los saltos de línea (\n) por etiquetas <br /> de HTML
  const content = { 
    __html: blog?.content?.replace(/\n/g, "<br />") || "" 
  }; 

  // D. LO QUE SE VE EN PANTALLA (El Return)
  // Esto no puede estar comentado ni oculto, es lo que React "pinta".
  return (
    <div>
      {/* Si el blog existe, mostramos el título, si no, nada */}
      <h1>{blog?.title}</h1>
      
      {/* Insertamos el contenido HTML procesado */}
      <div dangerouslySetInnerHTML={content} />
    </div>
  );
}; 

// 3. EXPORTACIÓN (¡Fuera de la función!)
export default BlogDetailsPage;