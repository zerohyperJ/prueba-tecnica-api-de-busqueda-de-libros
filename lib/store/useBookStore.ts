import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Book } from "@/lib/types/book";

interface BookStore {
  // Estado de búsqueda
  searchTerm: string;
  searchResults: Book[];
  isLoading: boolean;
  error: string | null;

  // Estado de favoritos
  favorites: Book[];

  // Acciones de búsqueda
  setSearchTerm: (term: string) => void;
  setSearchResults: (results: Book[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Acciones de favoritos
  addFavorite: (book: Book) => void;
  removeFavorite: (bookId: string) => void;
  isFavorite: (bookId: string) => boolean;
}

export const useBookStore = create<BookStore>()(
  persist(
    (set, get) => ({
      // Initial search state
      searchTerm: "",
      searchResults: [],
      isLoading: false,
      error: null,

      // Initial favorites state
      favorites: [],

      // Search actions
      setSearchTerm: (term: string) =>
        set({
          searchTerm: term,
        }),

      setSearchResults: (results: Book[]) =>
        set({
          searchResults: results,
          isLoading: false,
          error: null,
        }),

      setLoading: (loading: boolean) =>
        set({
          isLoading: loading,
          error: loading ? null : get().error,
        }),

      setError: (error: string | null) =>
        set({
          error,
          isLoading: false,
        }),

      // Favorites actions
      addFavorite: (book: Book) =>
        set((state) => {
          // Check if book is already in favorites
          const exists = state.favorites.some((fav) => fav.id === book.id);
          if (exists) {
            return state;
          }
          return {
            favorites: [...state.favorites, book],
          };
        }),

      removeFavorite: (bookId: string) =>
        set((state) => ({
          favorites: state.favorites.filter((book) => book.id !== bookId),
        })),

      isFavorite: (bookId: string) => {
        const state = get();
        return state.favorites.some((book) => book.id === bookId);
      },
    }),
    {
      name: "book-store", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist favorites, not search state
      partialize: (state) => ({
        favorites: state.favorites,
      }),
    }
  )
);
