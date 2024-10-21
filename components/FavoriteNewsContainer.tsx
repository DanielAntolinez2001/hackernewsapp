"use client";

// Importa los hooks useState y useEffect de React
import { useState, useEffect } from "react";
// Importa el componente NewsList
import NewsList from "./NewsList";
// Importa la función getLikedNews desde el módulo localStorage
import { getLikedNews } from "../utils/localStorage";
// Importa el tipo NewsItem
import { NewsItem } from "../types/news";
// Importa varios componentes de la interfaz de usuario
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Importa el componente Icons
import { Icons } from "@/components/ui/icons";

// Define las propiedades que acepta el componente FavoriteNewsContainer
interface FavoriteNewsContainerProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

// Define el componente FavoriteNewsContainer
export default function FavoriteNewsContainer({
  activeFilter,
  onFilterChange,
}: FavoriteNewsContainerProps) {
  // Define el estado local favoriteNews y su función para actualizarlo
  const [favoriteNews, setFavoriteNews] = useState<NewsItem[]>([]);

  // useEffect para actualizar las noticias favoritas cuando el componente se monta
  useEffect(() => {
    // Función para actualizar las noticias favoritas
    const updateFavorites = () => {
      // Obtiene las noticias favoritas desde el almacenamiento local
      const likedNews = getLikedNews();
      // Actualiza el estado con las noticias favoritas
      setFavoriteNews(likedNews);
    };

    // Llama a la función para actualizar las noticias favoritas
    updateFavorites();
    // Añade un event listener para actualizar las noticias favoritas cuando cambia el almacenamiento local
    window.addEventListener("storage", updateFavorites);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("storage", updateFavorites);
    };
  }, []);

  // Filtra las noticias favoritas (actualmente no se aplica ningún filtro)
  const filteredNews = favoriteNews;

  // Retorna el JSX del componente (aún no completo)
  return (
    <div className="space-y-6">
      <Select onValueChange={onFilterChange} value={activeFilter}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="angular">
            <div className="flex items-center">
              <Icons.angular className="mr-2 h-4 w-4" />
              <span>Angular</span>
            </div>
          </SelectItem>
          <SelectItem value="reactjs">
            <div className="flex items-center">
              <Icons.react className="mr-2 h-4 w-4" />
              <span>React</span>
            </div>
          </SelectItem>
          <SelectItem value="vuejs">
            <div className="flex items-center">
              <Icons.vue className="mr-2 h-4 w-4" />
              <span>Vue.js</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <h2 className="text-2xl font-semibold">Favorite News</h2>
      {filteredNews.length > 0 ? (
        <NewsList news={filteredNews} lastNewsElementRef={() => {}} />
      ) : (
        <p className="text-center text-muted-foreground">
          {favoriteNews.length > 0
            ? "No favorite news found. Try changing the filter."
            : "No favorite news yet. Like some news to see them here!"}
        </p>
      )}
    </div>
  );
}
