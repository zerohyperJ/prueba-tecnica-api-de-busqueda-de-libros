import { Book } from "@/lib/types/book";

/**
 * Validates if a book object has all required fields
 * @param book - Book object to validate
 * @returns true if book is valid, false otherwise
 */
export function isValidBook(book: any): book is Book {
  return (
    book &&
    typeof book === "object" &&
    typeof book.id === "string" &&
    book.id.length > 0 &&
    typeof book.title === "string" &&
    book.title.length > 0 &&
    Array.isArray(book.author) &&
    book.author.length > 0
  );
}

/**
 * Formats an array of author names into a readable string
 * @param authors - Array of author names
 * @param maxAuthors - Maximum number of authors to display
 * @returns Formatted author string
 */
export function formatAuthors(authors: string[], maxAuthors: number = 3): string {
  if (!authors || authors.length === 0) {
    return "Unknown Author";
  }

  if (authors.length <= maxAuthors) {
    return authors.join(", ");
  }

  const displayedAuthors = authors.slice(0, maxAuthors);
  const remainingCount = authors.length - maxAuthors;
  return `${displayedAuthors.join(", ")} y ${remainingCount} más`;
}

/**
 * Returns a placeholder image URL when book cover is not available
 * @param title - Book title to generate placeholder
 * @returns Placeholder image URL or null
 */
export function getPlaceholderCover(title: string): string | null {
  // For now, return null to use the default SVG placeholder in components
  // In the future, this could generate a colored placeholder based on title
  return null;
}

/**
 * Truncates text to a specified length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + "...";
}

/**
 * Formats a year or date string to display year only
 * @param dateString - Date string or year
 * @returns Formatted year string
 */
export function formatPublishYear(dateString: string | number | undefined): string {
  if (!dateString) {
    return "Año desconocido";
  }

  if (typeof dateString === "number") {
    return dateString.toString();
  }

  // Extract year from date string (e.g., "1954-07-29" -> "1954")
  const yearMatch = dateString.match(/^\d{4}/);
  return yearMatch ? yearMatch[0] : dateString;
}

/**
 * Sanitizes search query by removing special characters and extra spaces
 * @param query - Search query string
 * @returns Sanitized query string
 */
export function sanitizeSearchQuery(query: string): string {
  return query
    .trim()
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .replace(/[<>]/g, ""); // Remove potential HTML characters
}

/**
 * Checks if a string is a valid Open Library work ID
 * @param id - ID string to validate
 * @returns true if valid work ID format
 */
export function isValidWorkId(id: string): boolean {
  // Open Library work IDs typically follow pattern: OL\d+W
  return /^OL\d+W$/.test(id);
}

/**
 * Debounces a function call
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
