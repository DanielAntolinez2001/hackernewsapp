import NewsItem from "./NewsItem";

// Definición de la interfaz NewsItem que describe la estructura de un objeto de noticia
interface NewsItem {
  objectID: string; // Identificador único del objeto
  story_url: string; // URL de la historia
  story_title: string; // Título de la historia
  author: string; // Autor de la historia
  created_at: string; // Fecha de creación de la historia
}

// Definición de la interfaz NewsListProps que describe las propiedades que recibe el componente NewsList
interface NewsListProps {
  news: NewsItem[]; // Array de objetos de noticias
  lastNewsElementRef: (node: HTMLDivElement | null) => void; // Función de referencia para el último elemento de la lista
}

// Definición del componente funcional NewsList
export default function NewsList({ news, lastNewsElementRef }: NewsListProps) {
  return (
    // Contenedor principal con clases de estilo para la disposición en cuadrícula
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {news.map((item, index) => (
        // Cada noticia se renderiza dentro de un div
        <div
          key={item.objectID} // Clave única para cada elemento de la lista
          ref={index === news.length - 1 ? lastNewsElementRef : null} // Se asigna la referencia al último elemento de la lista
        >
          <NewsItem item={item} />{" "}
          {/* Componente NewsItem que recibe el objeto de noticia */}
        </div>
      ))}
    </div>
  );
}
