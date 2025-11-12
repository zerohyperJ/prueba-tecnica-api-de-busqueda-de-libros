"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useBookStore } from "@/lib/store/useBookStore";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSearchTerm } = useBookStore();
  const [inputValue, setInputValue] = useState("");

  // Initialize input value from URL query parameter
  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setInputValue(query);
      setSearchTerm(query);
    }
  }, [searchParams, setSearchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();

    if (trimmedValue) {
      setSearchTerm(trimmedValue);
      router.push(`/?q=${encodeURIComponent(trimmedValue)}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Buscar libros por título..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Buscar libros"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!inputValue.trim()}
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
