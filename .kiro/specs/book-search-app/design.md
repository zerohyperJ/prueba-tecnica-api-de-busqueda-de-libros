# Design Document

## Overview

Esta aplicación Next.js utiliza el App Router con TypeScript para proporcionar una experiencia de búsqueda de libros con SSR. La arquitectura se basa en componentes reutilizables, gestión de estado centralizada con Zustand, y una integración eficiente con la Open Library API.

## Architecture

### Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **API**: Open Library API

### Project Structure

```
app/
├── page.tsx                    # Search page (SSR)
├── books/
│   └── [id]/
│       └── page.tsx           # Book details page (SSR)
├── layout.tsx                 # Root layout
└── globals.css                # Global styles

components/
├── BookCard.tsx               # Book card component
├── SearchBar.tsx              # Search input component
├── FavoriteButton.tsx         # Favorite toggle button
├── FavoritesSidebar.tsx       # Favorites list component
└── LoadingSpinner.tsx         # Loading indicator

lib/
├── api/
│   └── openLibrary.ts         # API client functions
├── store/
│   └── useBookStore.ts        # Zustand store
└── types/
    └── book.ts                # TypeScript interfaces

utils/
└── helpers.ts                 # Utility functions
```

## Components and Interfaces

### 1. Zustand Store (`lib/store/useBookStore.ts`)

```typescript
interface BookStore {
  // Search state
  searchTerm: string;
  searchResults: Book[];
  isLoading: boolean;
  error: string | null;
  
  // Favorites state
  favorites: Book[];
  
  // Actions
  setSearchTerm: (term: string) => void;
  setSearchResults: (results: Book[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addFavorite: (book: Book) => void;
  removeFavorite: (bookId: string) => void;
  isFavorite: (bookId: string) => boolean;
}
```

**Design Decisions:**
- Zustand se elige por su simplicidad y bajo boilerplate comparado con Redux
- El estado de favoritos se persiste usando `persist` middleware de Zustand con localStorage
- Las acciones están centralizadas para facilitar el debugging y mantenimiento

### 2. Type Definitions (`lib/types/book.ts`)

```typescript
interface Book {
  id: string;              // Open Library work ID (e.g., "OL27448W")
  title: string;
  author: string[];
  coverUrl?: string;
  firstPublishYear?: number;
  description?: string;
}

interface SearchResponse {
  docs: SearchDoc[];
  numFound: number;
}

interface SearchDoc {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
}

interface BookDetails {
  title: string;
  authors?: Array<{ author: { key: string } }>;
  description?: string | { value: string };
  covers?: number[];
  first_publish_date?: string;
}
```

### 3. API Client (`lib/api/openLibrary.ts`)

```typescript
// Search books by query
async function searchBooks(query: string): Promise<Book[]>

// Get book details by ID
async function getBookDetails(bookId: string): Promise<Book>

// Helper to construct cover image URLs
function getCoverUrl(coverId: number, size: 'S' | 'M' | 'L'): string
```

**API Integration Details:**
- Search endpoint: `https://openlibrary.org/search.json?q={query}`
- Details endpoint: `https://openlibrary.org/works/{id}.json`
- Cover images: `https://covers.openlibrary.org/b/id/{cover_id}-{size}.jpg`
- Error handling con try-catch y mensajes descriptivos
- Timeout de 10 segundos para requests

### 4. Search Page (`app/page.tsx`)

**SSR Implementation:**
```typescript
export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q;
  let initialResults: Book[] = [];
  let error: string | null = null;

  if (query) {
    try {
      initialResults = await searchBooks(query);
    } catch (e) {
      error = 'Error al buscar libros';
    }
  }

  return <SearchPageClient initialResults={initialResults} initialQuery={query} error={error} />;
}
```

**Client Component:**
- Recibe resultados iniciales del servidor
- Sincroniza con Zustand store
- Maneja búsquedas subsecuentes en el cliente
- Muestra loading states y errores

### 5. Book Details Page (`app/books/[id]/page.tsx`)

**SSR Implementation:**
```typescript
export default async function BookDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  let book: Book | null = null;
  let error: string | null = null;

  try {
    book = await getBookDetails(params.id);
  } catch (e) {
    error = 'No se pudo cargar el libro';
  }

  if (!book) {
    return <div>Libro no encontrado</div>;
  }

  return <BookDetailsClient book={book} error={error} />;
}
```

### 6. Component Hierarchy

```
Layout
├── FavoritesSidebar (always visible)
└── Page Content
    ├── SearchPage
    │   ├── SearchBar
    │   └── BookCard[] (with FavoriteButton)
    └── BookDetailsPage
        ├── Book Info
        └── FavoriteButton
```

## Data Models

### Book Model

El modelo principal que representa un libro en la aplicación:

```typescript
{
  id: "OL27448W",
  title: "The Lord of the Rings",
  author: ["J.R.R. Tolkien"],
  coverUrl: "https://covers.openlibrary.org/b/id/8739161-M.jpg",
  firstPublishYear: 1954,
  description: "Epic fantasy novel..."
}
```

### Favorites Storage

Los favoritos se persisten en localStorage con la siguiente estructura:

```json
{
  "book-store": {
    "state": {
      "favorites": [
        { "id": "OL27448W", "title": "...", ... }
      ]
    },
    "version": 0
  }
}
```

## Error Handling

### Error Types

1. **Network Errors**: Timeout o falta de conexión
2. **API Errors**: Respuestas 4xx/5xx de Open Library
3. **Data Errors**: Datos malformados o faltantes

### Error Handling Strategy

```typescript
try {
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  const data = await response.json();
  return transformData(data);
} catch (error) {
  if (error.name === 'AbortError') {
    throw new Error('La solicitud tardó demasiado tiempo');
  }
  throw new Error('Error al conectar con el servidor');
}
```

### User-Facing Error Messages

- Search errors: "No se pudieron cargar los resultados. Intenta de nuevo."
- Details errors: "No se pudo cargar la información del libro."
- Network errors: "Verifica tu conexión a internet."
- No results: "No se encontraron libros para tu búsqueda."

## Testing Strategy

### Unit Tests

- Zustand store actions (add/remove favorites, state updates)
- API client functions (data transformation, error handling)
- Utility functions (URL construction, data validation)

### Integration Tests

- Search flow: input → API call → results display
- Favorites flow: add → persist → remove
- Navigation: search results → details page

### Component Tests

- BookCard renders correctly with/without cover
- FavoriteButton toggles state
- SearchBar handles input and submission
- FavoritesSidebar displays favorites list

### E2E Tests (Optional)

- Complete user journey: search → view details → add to favorites
- Favorites persistence across page reloads
- Error states display correctly

## Performance Considerations

### Optimization Strategies

1. **Image Optimization**: Use Next.js Image component for covers
2. **Debouncing**: Debounce search input (300ms) to reduce API calls
3. **Caching**: Leverage Next.js caching for SSR pages
4. **Code Splitting**: Automatic with Next.js App Router
5. **Lazy Loading**: Load FavoritesSidebar only when needed

### SSR Benefits

- Faster initial page load
- Better SEO for search results
- Improved perceived performance
- Works without JavaScript enabled (progressive enhancement)

## Styling Approach

### Tailwind CSS Configuration

- Responsive design (mobile-first)
- Custom color palette for favorites (heart icons)
- Consistent spacing and typography
- Dark mode support (optional enhancement)

### Component Styling Patterns

```typescript
// BookCard example
<div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
  <img className="w-full h-48 object-cover rounded" />
  <h3 className="text-lg font-semibold mt-2">{title}</h3>
  <p className="text-gray-600">{author}</p>
</div>
```

## Accessibility

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Alt text for images
- Screen reader friendly error messages

## Future Enhancements

- Pagination for search results
- Advanced search filters (author, year, subject)
- Book ratings and reviews
- User authentication for cloud-synced favorites
- Reading lists and collections
- Share functionality
