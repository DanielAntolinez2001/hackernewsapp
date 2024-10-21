// Importa la función clsx y el tipo ClassValue desde el paquete clsx
import { clsx, type ClassValue } from "clsx";
// Importa la función twMerge desde el paquete tailwind-merge
import { twMerge } from "tailwind-merge";

/**
 * Función para combinar clases CSS utilizando clsx y twMerge.
 *
 * @param inputs - Un array de valores de clase que pueden ser cadenas, objetos, arrays, etc.
 * @returns Una cadena de clases combinadas y optimizadas.
 */
export function cn(...inputs: ClassValue[]) {
  // Combina las clases utilizando clsx y luego optimiza la combinación utilizando twMerge
  return twMerge(clsx(inputs));
}
