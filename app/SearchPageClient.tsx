"use client";

import { useEffect, useState } from "react";
import { useBookStore } from "@/lib/store/useBookStore";
import { searchBooks } from "@/lib/api/openLibrary";
import { Book } from "@/lib/types/book";
import SearchBar from "@/components/SearchBar";
import BookCard from "@/components/BookCard";
import LoadingSpinner from "@/components/LoadingSpinner";

interface SearchPageClientProps {
  initialResults: Book[];
  initialQuery: string;
  error: string | null;
}

export default function SearchPageClient({
  initialResults,
  initialQuery,
  error: initialError,
}: SearchPageClientProps) {
  const { 
    searchResults, 
    isLoading, 
    error, 
    searchTerm, 
    setSearchResults, 
    setError, 
    setSearchTerm,
    setLoading 
  } = useBookStore();
  
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Sync initial server-side data with store (only once)
  useEffect(() => {
    if (!initialized && initialQuery) {
      setSearchTerm(initialQuery);
      if (initialResults.length > 0) {
        setSearchResults(initialResults);
        setSearchCompleted(true);
      } else if (initialError) {
        setError(initialError);
        setSearchCompleted(true);
      } else {
        // SSR returned empty results, mark as completed
        setSearchCompleted(true);
      }
      setInitialized(true);
    }
  }, [initialized, initialQuery, initialResults, initialError, setSearchResults, setError, setSearchTerm]);

  // Perform client-side search when searchTerm changes
  useEffect(() => {
    const performSearch = async () => {
      if (!searchTerm || searchTerm.trim() === "") {
        setSearchResults([]);
        setSearchCompleted(false);
        return;
      }

      // Skip if this is the initial query and we already have data from SSR
      if (searchTerm === initialQuery && initialized) {
        return;
      }

      setLoading(true);
      setError(null);
      setSearchCompleted(false);

      try {
        const results = await searchBooks(searchTerm);
        setSearchResults(results);
        setSearchCompleted(true);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Error al buscar libros";
        setError(errorMessage);
        setSearchResults([]);
        setSearchCompleted(true);
      }
    };

    // Only search if searchTerm is different from initialQuery or not initialized yet
    if (searchTerm && (searchTerm !== initialQuery || !initialized)) {
      performSearch();
    }
  }, [searchTerm, initialQuery, initialized, setSearchResults, setError, setLoading]);

  // Show results from store if available, otherwise show initial results
  const displayResults = searchResults.length > 0 ? searchResults : initialResults;
  const displayError = error || initialError;
  const hasQuery = initialQuery || searchTerm;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div id="search" className="scroll-mt-20">
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
            Búsqueda de Libros
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Encuentra tus libros favoritos usando Open Library
          </p>

          <SearchBar />
        </div>

        {isLoading && <LoadingSpinner />}

        {displayError && !isLoading && (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-800">{displayError}</p>
          </div>
        )}

        {!isLoading && !displayError && hasQuery && searchCompleted && displayResults.length === 0 && (
          <div className="max-w-2xl mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <svg
              className="w-16 h-16 mx-auto text-yellow-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-yellow-800 font-medium">
              No se encontraron libros para tu búsqueda
            </p>
            <p className="text-yellow-600 text-sm mt-2">
              Intenta con otros términos de búsqueda
            </p>
          </div>
        )}

        {!isLoading && !displayError && displayResults.length > 0 && (
          <div>
            <p className="text-gray-600 mb-4">
              Se encontraron {displayResults.length} resultados
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayResults.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        )}

        {!hasQuery && !isLoading && displayResults.length === 0 && (
          <div className="max-w-2xl mx-auto text-center py-12">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-gray-500 text-lg">
              Comienza buscando un libro por su título
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
