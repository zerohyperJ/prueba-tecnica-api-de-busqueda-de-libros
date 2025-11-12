"use client";

import Image from "next/image";
import Link from "next/link";
import { Book } from "@/lib/types/book";
import FavoriteButton from "@/components/FavoriteButton";

interface BookDetailsClientProps {
  book: Book | null;
  error: string | null;
}

export default function BookDetailsClient({
  book,
  error,
}: BookDetailsClientProps) {
  if (error || !book) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <svg
            className="w-20 h-20 mx-auto text-red-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Error al cargar el libro
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver a la búsqueda
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/#search"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver a la búsqueda
        </Link>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
          <div className="md:flex">
            {/* Book Cover */}
            <div className="md:w-2/5 bg-gradient-to-br from-gray-50 to-gray-100 flex items-start justify-center p-8 md:p-12">
              {book.coverUrl ? (
                <div className="relative w-full max-w-sm" style={{ aspectRatio: '2/3' }}>
                  <Image
                    src={book.coverUrl}
                    alt={`Portada de ${book.title}`}
                    fill
                    className="object-cover rounded-lg shadow-lg"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    quality={85}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <svg
                    className="w-32 h-32"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <span className="text-lg mt-4">Sin portada disponible</span>
                </div>
              )}
            </div>

            {/* Book Details */}
            <div className="md:w-3/5 p-8 md:p-12">
              <div className="flex items-start justify-between mb-6">
                <h1 className="text-4xl font-bold text-gray-900 flex-1 leading-tight">
                  {book.title}
                </h1>
                <div className="ml-4">
                  <FavoriteButton book={book} size="lg" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Autor(es)
                  </h2>
                  <p className="text-xl text-gray-800 font-medium">
                    {book.author.join(", ")}
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Año de publicación
                  </h2>
                  <p className="text-xl text-gray-800 font-medium">
                    {book.firstPublishYear && !isNaN(book.firstPublishYear)
                      ? book.firstPublishYear
                      : "Sin fecha de publicación"}
                  </p>
                </div>

                {book.description && (
                  <div className="mt-8">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                      Descripción
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                      {book.description}
                    </p>
                  </div>
                )}

                {!book.description && (
                  <div className="mt-8">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                      Descripción
                    </h2>
                    <p className="text-gray-500 italic">
                      No hay descripción disponible para este libro.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
