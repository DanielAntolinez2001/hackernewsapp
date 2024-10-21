"use client"; // Indica que este archivo se ejecuta en el cliente

import { useState, useEffect, useRef, useCallback } from "react"; // Importa hooks de React
import axios from "axios"; // Importa axios para realizar solicitudes HTTP
import NewsList from "./NewsList"; // Importa el componente NewsList
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Importa componentes de selección de la UI
import { Icons } from "@/components/ui/icons"; // Importa íconos de la UI

// Define la interfaz para un elemento de noticia
interface NewsItem {
  objectID: string;
  story_url: string;
  story_title: string;
  author: string;
  created_at: string;
}

// Define las propiedades que acepta el componente NewsContainer
interface NewsContainerProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

// Define el componente NewsContainer
export default function NewsContainer({
  activeFilter,
  onFilterChange,
}: NewsContainerProps) {
  // Define el estado local para las noticias, la página actual, el estado de carga y si hay más noticias
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Crea una referencia para el observador de intersección
  const observer = useRef<IntersectionObserver | null>(null);

  // Define una función de callback para el último elemento de noticias
  const lastNewsElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return; // Si está cargando, no hace nada
      if (observer.current) observer.current.disconnect(); // Desconecta el observador actual
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // Si el último elemento es visible y hay más noticias, realiza alguna acción
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node); // Observa el nuevo nodo
    },
    [isLoading, hasMore]
  );

  // Efecto para reiniciar las noticias cuando cambia el filtro activo
  useEffect(() => {
    setNews([]);
    setPage(0);
    setHasMore(true);
  }, [activeFilter]);

  // Efecto para obtener noticias cuando cambia el filtro activo o la página
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get<{ hits: NewsItem[]; nbPages: number }>(
          `/api/news?query=${activeFilter}&page=${page}`
        );
        setNews((prevNews) => [...prevNews, ...res.data.hits]);
        setHasMore(res.data.hits.length > 0);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [activeFilter, page]);

  // Maneja el cambio de filtro
  const handleFilterChange = (value: string) => {
    onFilterChange(value);
  };

  return (
    <div className="space-y-6">
      <Select onValueChange={handleFilterChange} value={activeFilter}>
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
      <NewsList news={news} lastNewsElementRef={lastNewsElementRef} />
      {isLoading && <div className="text-center">Loading...</div>}
    </div>
  );
}
