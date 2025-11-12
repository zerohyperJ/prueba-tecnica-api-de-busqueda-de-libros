"use client";

import Link from "next/link";
import { useBookStore } from "@/lib/store/useBookStore";
import BookCard from "@/components/BookCard";

export default function FavoritesPage() {
  const { favorites } = useBookStore();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/#search"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Mis Favoritos
          </h1>
          <p className="text-gray-600">
            {favorites.length > 0
              ? `Tienes ${favorites.length} ${
                  favorites.length === 1 ? "libro" : "libros"
                } en tu lista de favoritos`
              : "Aún no has agregado libros a favoritos"}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-12 text-center">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              No hay favoritos aún
            </h2>
            <p className="text-gray-600 mb-6">
              Explora nuestra biblioteca y agrega libros a tu lista de favoritos
            </p>
            <Link
              href="/#search"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Buscar libros
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
