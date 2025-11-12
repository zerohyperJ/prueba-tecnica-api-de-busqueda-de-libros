// Interfaz principal de Libro usada en toda la aplicación
export interface Book {
  id: string; // ID de obra de Open Library (ej: "OL27448W")
  title: string;
  author: string[];
  coverUrl?: string;
  firstPublishYear?: number;
  description?: string;
}

// Estructura de respuesta de la API de búsqueda de Open Library
export interface SearchResponse {
  docs: SearchDoc[];
  numFound: number;
  start: number;
  numFoundExact: boolean;
}

// Documento individual de libro desde resultados de búsqueda
export interface SearchDoc {
  key: string; // ej: "/works/OL27448W"
  title: string;
  author_name?: string[];
  author_key?: string[];
  cover_i?: number;
  first_publish_year?: number;
  isbn?: string[];
  publisher?: string[];
  language?: string[];
  number_of_pages_median?: number;
}

// Estructura de respuesta de la API de detalles de libro de Open Library
export interface BookDetails {
  key: string;
  title: string;
  description?: string | { type: string; value: string };
  covers?: number[];
  authors?: Array<{
    author: {
      key: string;
    };
    type?: {
      key: string;
    };
  }>;
  subjects?: string[];
  first_publish_date?: string;
  created?: {
    type: string;
    value: string;
  };
  last_modified?: {
    type: string;
    value: string;
  };
}

// Detalles de autor desde Open Library
export interface AuthorDetails {
  key: string;
  name: string;
  birth_date?: string;
  death_date?: string;
  bio?: string | { type: string; value: string };
}
