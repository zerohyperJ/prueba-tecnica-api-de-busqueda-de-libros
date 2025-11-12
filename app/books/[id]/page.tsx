import { getBookDetails } from "@/lib/api/openLibrary";
import { Book } from "@/lib/types/book";
import BookDetailsClient from "./BookDetailsClient";
import { Metadata } from "next";

interface BookDetailsPageProps {
  params: { id: string };
}

// Configuración de caché: revalidar cada 24 horas
export const revalidate = 86400;

export async function generateMetadata({
  params,
}: BookDetailsPageProps): Promise<Metadata> {
  try {
    const book = await getBookDetails(params.id);
    return {
      title: `${book.title} - Book Search App`,
      description: book.description || `${book.title} por ${book.author.join(", ")}`,
    };
  } catch {
    return {
      title: "Libro no encontrado - Book Search App",
    };
  }
}

export default async function BookDetailsPage({
  params,
}: BookDetailsPageProps) {
  let book: Book | null = null;
  let error: string | null = null;

  try {
    book = await getBookDetails(params.id);
  } catch (e) {
    error = e instanceof Error ? e.message : "No se pudo cargar el libro";
    console.error("Book details error:", e);
  }

  if (!book && !error) {
    error = "Libro no encontrado";
  }

  return <BookDetailsClient book={book} error={error} />;
}
