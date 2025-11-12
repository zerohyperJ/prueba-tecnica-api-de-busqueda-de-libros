import { searchBooks } from "@/lib/api/openLibrary";
import { Book } from "@/lib/types/book";
import SearchPageClient from "./SearchPageClient";

interface SearchPageProps {
  searchParams: { q?: string };
}

// Configuración de caché: revalidar cada 1 hora
export const revalidate = 3600;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q;
  let initialResults: Book[] = [];
  let error: string | null = null;

  // Perform server-side search if query exists
  if (query) {
    try {
      initialResults = await searchBooks(query);
    } catch (e) {
      error =
        e instanceof Error ? e.message : "Error al buscar libros";
      console.error("Search error:", e);
    }
  }

  return (
    <SearchPageClient
      initialResults={initialResults}
      initialQuery={query || ""}
      error={error}
    />
  );
}
