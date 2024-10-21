"use client"; // Indica que este archivo se ejecuta en el cliente

import { useState, useEffect } from "react"; // Importa los hooks useState y useEffect de React
import { Card, CardContent, CardFooter } from "@/components/ui/card"; // Importa componentes de tarjeta de la UI
import { Button } from "@/components/ui/button"; // Importa el componente Button de la UI
import { Heart } from "lucide-react"; // Importa el ícono Heart de lucide-react
import {
  getLikedStatus,
  setLikedStatus,
  setNewsItem,
} from "../utils/localStorage"; // Importa funciones de utilidades para el almacenamiento local
import { NewsItem as NewsItemType } from "../types/news"; // Importa el tipo NewsItem

// Define las propiedades que acepta el componente NewsItem
interface NewsItemProps {
  item: NewsItemType;
}

// Define el componente NewsItem
export default function NewsItem({ item }: NewsItemProps) {
  // Define el estado local para el estado de "me gusta"
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // useEffect para establecer el estado inicial de "me gusta" cuando el componente se monta
  useEffect(() => {
    setIsLiked(getLikedStatus(item.objectID)); // Obtiene el estado de "me gusta" desde el almacenamiento local
  }, [item.objectID]); // Se ejecuta cuando cambia el objectID del item

  // Maneja el evento de clic en el botón de "me gusta"
  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Previene la acción predeterminada del evento
    const newLikedStatus = !isLiked; // Invierte el estado de "me gusta"
    setIsLiked(newLikedStatus); // Actualiza el estado local
    setLikedStatus(item.objectID, newLikedStatus); // Guarda el nuevo estado de "me gusta" en el almacenamiento local
    setNewsItem(item); // Siempre guarda el item, independientemente del estado de "me gusta"
  };

  // Retorna el JSX del componente
  return (
    <Card className="h-full transition-opacity duration-300 hover:opacity-75">
      <CardContent className="p-6">
        <a
          href={item.story_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors duration-300">
            {item.story_title || "No title available"}{" "}
            {/* Muestra el título de la historia o un mensaje predeterminado */}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            By {item.author || "Unknown author"}
          </p>
        </a>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          {item.created_at
            ? new Date(item.created_at).toLocaleString()
            : "Date unknown"}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLike}
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <Heart
            className={`h-6 w-6 ${
              isLiked ? "fill-current text-red-500" : "text-muted-foreground"
            }`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
}
