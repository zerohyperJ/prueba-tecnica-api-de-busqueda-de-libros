"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBookStore } from "@/lib/store/useBookStore";

export default function Header() {
  const pathname = usePathname();
  const { favorites } = useBookStore();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={() => window.location.href = '/'}>
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="text-xl font-bold text-gray-800">SemBook</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              href="/#search"
              className={`text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Buscar
            </Link>
            <Link
              href="/favorites"
              className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                pathname === "/favorites"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill={pathname === "/favorites" ? "currentColor" : "none"}
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
              <span>Favoritos</span>
              {favorites.length > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 font-semibold">
                  {favorites.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
