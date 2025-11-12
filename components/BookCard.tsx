"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Book } from "@/lib/types/book";
import FavoriteButton from "./FavoriteButton";

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  return (
    <div className="group h-full">
      <Link href={`/books/${book.id}`}>
        <div className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white h-full flex flex-col group-hover:scale-[1.02]">
          <div className="relative w-full h-64 mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          {book.coverUrl ? (
            <Image
              src={book.coverUrl}
              alt={`Portada de ${book.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              quality={75}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <svg
                className="w-16 h-16"
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
              <span className="text-sm mt-2">Sin portada</span>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="text-base font-bold mb-2 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">
            {book.title}
          </h3>

          <p className="text-gray-600 text-sm mb-2 line-clamp-1">
            {book.author.join(", ")}
          </p>

          <p className="text-gray-500 text-xs mb-3">
            {book.firstPublishYear && !isNaN(book.firstPublishYear)
              ? book.firstPublishYear
              : "Sin fecha de publicación"}
          </p>

          <div className="mt-auto pt-3 border-t border-gray-100 flex justify-end">
            <FavoriteButton book={book} size="md" />
          </div>
        </div>
        </div>
      </Link>
    </div>
  );
}

export default memo(BookCard);
