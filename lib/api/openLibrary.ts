import {
  Book,
  SearchResponse,
  BookDetails,
  AuthorDetails,
} from "@/lib/types/book";

const BASE_URL = "https://openlibrary.org";
const COVERS_URL = "https://covers.openlibrary.org/b";
const REQUEST_TIMEOUT = 8000; // 8 segundos
const AUTHOR_TIMEOUT = 3000; // 3 segundos para autores

/**
 * Construye la URL de la imagen de portada desde Open Library
 * @param coverId - ID de la portada desde la API
 * @param size - Tamaño de la imagen ('S', 'M', o 'L')
 * @returns URL completa de la imagen de portada
 */
export function getCoverUrl(
  coverId: number,
  size: "S" | "M" | "L" = "M"
): string {
  return `${COVERS_URL}/id/${coverId}-${size}.jpg`;
}

/**
 * Extrae el ID de la obra desde una clave de Open Library
 * @param key - Cadena de clave (ej: "/works/OL27448W")
 * @returns ID de la obra (ej: "OL27448W")
 */
function extractWorkId(key: string): string {
  const parts = key.split("/");
  return parts[parts.length - 1];
}

/**
 * Extrae y limpia el texto de descripción de varios formatos
 * @param description - Campo de descripción de la API (puede ser string u objeto)
 * @returns Descripción en texto plano
 */
function extractDescription(
  description: string | { type: string; value: string } | undefined
): string | undefined {
  if (!description) return undefined;
  
  let text = typeof description === "string" ? description : description.value;
  
  // Eliminar sección "Contains" y todo lo que viene después
  const containsIndex = text.indexOf("**Contains**");
  if (containsIndex !== -1) {
    text = text.substring(0, containsIndex).trim();
  }
  
  // Eliminar enlaces markdown [texto](url) y mantener solo el texto
  text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");
  
  // Eliminar enlaces de estilo referencia [texto][ref]
  text = text.replace(/\[([^\]]+)\]\[\d+\]/g, "$1");
  
  // Eliminar referencias de enlaces al final [1]: url
  text = text.replace(/\[\d+\]:\s*https?:\/\/[^\s]+/g, "");
  
  // Limpiar espacios en blanco y saltos de línea extra
  text = text.replace(/\n{3,}/g, "\n\n").trim();
  
  return text || undefined;
}

/**
 * Busca libros usando la API de búsqueda de Open Library
 * @param query - Término de búsqueda
 * @returns Array de objetos Book
 * @throws Error si la petición falla o excede el tiempo límite
 */
export async function searchBooks(query: string): Promise<Book[]> {
  if (!query || query.trim() === "") {
    return [];
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(
      `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=20&fields=key,title,author_name,cover_i,first_publish_year`,
      {
        signal: controller.signal,
        next: { revalidate: 3600 }, // Caché de 1 hora
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: SearchResponse = await response.json();

    // Transformar resultados de búsqueda a interfaz Book
    const books: Book[] = data.docs.map((doc) => ({
      id: extractWorkId(doc.key),
      title: doc.title,
      author: doc.author_name || ["Autor Desconocido"],
      coverUrl: doc.cover_i ? getCoverUrl(doc.cover_i, "M") : undefined,
      firstPublishYear: doc.first_publish_year,
    }));

    return books;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("La solicitud tardó demasiado tiempo. Intenta de nuevo.");
      }
      throw new Error(`Error al buscar libros: ${error.message}`);
    }
    throw new Error("Error desconocido al buscar libros");
  }
}

/**
 * Obtiene información detallada de un libro específico
 * @param bookId - ID de la obra en Open Library (ej: "OL27448W")
 * @returns Objeto Book con información detallada
 * @throws Error si la petición falla o el libro no se encuentra
 */
export async function getBookDetails(bookId: string): Promise<Book> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    // Obtener detalles del libro
    const response = await fetch(`${BASE_URL}/works/${bookId}.json`, {
      signal: controller.signal,
      next: { revalidate: 86400 }, // Caché de 24 horas
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Libro no encontrado");
      }
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: BookDetails = await response.json();

    // Obtener nombres de autores si están disponibles (límite de 2 para rendimiento)
    let authorNames: string[] = ["Autor Desconocido"];
    if (data.authors && data.authors.length > 0) {
      try {
        const authorsToFetch = data.authors.slice(0, 2); // Limitar a 2 autores
        const authorPromises = authorsToFetch.map(async (author) => {
          const authorKey = author.author.key;
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), AUTHOR_TIMEOUT);
          
          try {
            const authorResponse = await fetch(`${BASE_URL}${authorKey}.json`, {
              signal: controller.signal,
              next: { revalidate: 604800 }, // Caché de 7 días para autores
            });
            clearTimeout(timeoutId);
            
            if (authorResponse.ok) {
              const authorData: AuthorDetails = await authorResponse.json();
              return authorData.name;
            }
          } catch {
            clearTimeout(timeoutId);
          }
          return null;
        });
        const results = await Promise.all(authorPromises);
        const validAuthors = results.filter((name): name is string => name !== null);
        if (validAuthors.length > 0) {
          authorNames = validAuthors;
        }
      } catch (error) {
        console.error("Error al obtener detalles de autores:", error);
      }
    }

    // Transformar a interfaz Book
    const book: Book = {
      id: extractWorkId(data.key),
      title: data.title,
      author: authorNames,
      coverUrl: data.covers?.[0] ? getCoverUrl(data.covers[0], "L") : undefined,
      firstPublishYear: data.first_publish_date
        ? parseInt(data.first_publish_date.split("-")[0])
        : undefined,
      description: extractDescription(data.description),
    };

    return book;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("La solicitud tardó demasiado tiempo. Intenta de nuevo.");
      }
      throw new Error(`Error al cargar el libro: ${error.message}`);
    }
    throw new Error("Error desconocido al cargar el libro");
  }
}
