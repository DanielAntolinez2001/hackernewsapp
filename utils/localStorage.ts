import { NewsItem } from "../types/news"; // Importa el tipo NewsItem

/**
 * Obtiene el filtro almacenado en localStorage.
 * @returns El filtro almacenado o "angular" si no hay ninguno.
 */
export function getStoredFilter(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("newsFilter") || "angular"; // Devuelve el filtro almacenado o "angular" por defecto
  }
  return "angular"; // Devuelve "angular" por defecto si window es undefined
}

/**
 * Almacena el filtro en localStorage.
 * @param filter - El filtro a almacenar.
 */
export function setStoredFilter(filter: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("newsFilter", filter); // Almacena el filtro en localStorage
  }
}

/**
 * Obtiene el estado de "me gusta" de una noticia desde localStorage.
 * @param id - El ID de la noticia.
 * @returns true si la noticia está marcada como "me gusta", false en caso contrario.
 */
export function getLikedStatus(id: string): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem(`liked_${id}`) === "true"; // Devuelve true si el estado es "true", false en caso contrario
  }
  return false; // Devuelve false si window es undefined
}

/**
 * Establece el estado de "me gusta" de una noticia en localStorage.
 * @param id - El ID de la noticia.
 * @param status - El estado de "me gusta" a establecer.
 */
export function setLikedStatus(id: string, status: boolean): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(`liked_${id}`, status.toString()); // Almacena el estado de "me gusta" en localStorage
  }
}

/**
 * Obtiene todas las noticias marcadas como "me gusta" desde localStorage.
 * @returns Un array de objetos NewsItem que están marcados como "me gusta".
 */
export function getLikedNews(): NewsItem[] {
  if (typeof window !== "undefined") {
    return Object.keys(localStorage)
      .filter((key) => key.startsWith("news_")) // Filtra las claves que empiezan con "news_"
      .map((key) => JSON.parse(localStorage.getItem(key) || "{}") as NewsItem) // Parsea los valores almacenados como NewsItem
      .filter((item) => getLikedStatus(item.objectID)); // Filtra los elementos que están marcados como "me gusta"
  }
  return []; // Devuelve un array vacío si window es undefined
}

/**
 * Almacena un objeto NewsItem en localStorage.
 * @param item - El objeto NewsItem a almacenar.
 */
export function setNewsItem(item: NewsItem): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(`news_${item.objectID}`, JSON.stringify(item)); // Almacena el objeto NewsItem en localStorage
  }
}
