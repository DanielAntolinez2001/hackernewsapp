// Define una interfaz para un elemento de noticia
export interface NewsItem {
  objectID: string; // Identificador único del elemento de noticia
  story_url: string; // URL de la historia
  story_title: string; // Título de la historia
  author: string; // Autor de la historia
  created_at: string; // Fecha de creación de la historia
}
