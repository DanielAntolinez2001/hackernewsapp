// Define las propiedades que acepta el componente Pagination
interface PaginationProps {
  currentPage: number; // Página actual
  totalPages: number; // Total de páginas
  onPageChange: (page: number) => void; // Función para manejar el cambio de página
}

// Define el componente Pagination
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      {/* Botón para ir a la página anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)} // Llama a la función onPageChange con la página anterior
        disabled={currentPage === 1} // Deshabilita el botón si estamos en la primera página
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors duration-300"
      >
        Previous
      </button>
      {/* Muestra la página actual y el total de páginas */}
      <span className="text-gray-700 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </span>
      {/* Botón para ir a la página siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)} // Llama a la función onPageChange con la página siguiente
        disabled={currentPage === totalPages} // Deshabilita el botón si estamos en la última página
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors duration-300"
      >
        Next
      </button>
    </div>
  );
}
