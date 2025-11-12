# 📚 SemBook - Aplicación de Búsqueda de Libros

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-4-orange?style=for-the-badge)

**Aplicación web moderna para buscar y gestionar tu biblioteca personal de libros favoritos**

</div>

---

## 📖 Sobre el Proyecto

**SemBook** es una aplicación web desarrollada con Next.js 14 que permite buscar libros usando la API de Open Library, visualizar información detallada y gestionar una lista personalizada de favoritos con persistencia local.

### ✨ Características Principales

- 🔍 **Búsqueda Avanzada** - Busca libros por título con resultados en tiempo real
- 📖 **Detalles Completos** - Visualiza portada, autor, año de publicación y descripción
- ❤️ **Sistema de Favoritos** - Guarda y administra tus libros favoritos
- ⚡ **Server-Side Rendering** - SSR para mejor rendimiento y SEO
- 📱 **Diseño Responsive** - Interfaz adaptable a todos los dispositivos
- 🚀 **Caché Optimizado** - Sistema multinivel para respuestas rápidas

---

## 🖼️ Capturas de Pantalla

### Página de Búsqueda
> *Busca libros por título y visualiza resultados con portadas, autores y botón de favoritos*

![Búsqueda de Libros](./public/screenshots/search.png)

### Detalles del Libro
> *Información completa del libro con descripción y opción de agregar a favoritos*

![Detalles del Libro](./public/screenshots/details.png)

### Página de Favoritos
> *Gestiona tu colección personal de libros favoritos*

![Favoritos](./public/screenshots/favorites.png)

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Next.js** | 14.x | Framework React con SSR |
| **TypeScript** | 5.x | Tipado estático |
| **Zustand** | 4.x | Gestión de estado global |
| **Tailwind CSS** | 3.x | Estilos y diseño |
| **Jest** | Latest | Testing unitario |
| **Open Library API** | - | Fuente de datos |

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18.x o superior
- npm o yarn

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/zerohyperJ/prueba-tecnica-api-de-busqueda-de-libros.git

# 2. Navegar al directorio
cd prueba-tecnica-api-de-busqueda-de-libros

# 3. Instalar dependencias
npm install

# 4. Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Comandos Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Compila para producción
npm start        # Inicia servidor de producción
npm test         # Ejecuta tests unitarios
npm run lint     # Ejecuta el linter
```

---

## 📁 Estructura del Proyecto

```
📦 sembook
├── 📂 app/                      # Rutas y páginas Next.js
│   ├── 📂 books/[id]/          # Página de detalles (SSR)
│   ├── 📂 favorites/           # Página de favoritos
│   ├── 📄 layout.tsx           # Layout principal
│   └── 📄 page.tsx             # Búsqueda (SSR)
├── 📂 components/              # Componentes reutilizables
│   ├── 📄 BookCard.tsx
│   ├── 📄 FavoriteButton.tsx
│   ├── 📄 Header.tsx
│   ├── 📄 LoadingSpinner.tsx
│   └── 📄 SearchBar.tsx
├── 📂 lib/                     # Lógica de negocio
│   ├── 📂 api/                 # Cliente API
│   ├── 📂 store/               # Store Zustand
│   └── 📂 types/               # Tipos TypeScript
├── 📂 utils/                   # Utilidades
└── 📂 __tests__/              # Tests unitarios
```

---

## 🎯 Funcionalidades

### 1️⃣ Búsqueda de Libros

- Campo de búsqueda con validación
- Resultados con SSR
- Grid responsive
- Estados de carga y error
- Caché de 1 hora

### 2️⃣ Detalles del Libro

- Información completa del libro
- SSR para mejor SEO
- Imágenes optimizadas
- Botón de favoritos
- Caché de 24 horas

### 3️⃣ Sistema de Favoritos

- Agregar/eliminar con un clic
- Persistencia en localStorage
- Sincronización con Zustand
- Página dedicada
- Contador en header

---

## 🔧 Caché

| Recurso | Duración |
|---------|----------|
| Búsquedas | 1 hora |
| Detalles | 24 horas |
| Autores | 7 días |
| Favoritos | Persistente |

---

## 🧪 Testing

```bash
npm test                # Ejecutar tests
npm run test:watch      # Modo watch
```

**32 tests pasando** ✅

---

## 📝 Licencia

MIT

---

## 👨‍💻 Autor

[@zerohyperJ](https://github.com/zerohyperJ)

---

<div align="center">

**⭐ Si te gustó este proyecto, dale una estrella ⭐**

Hecho con ❤️ usando Next.js y Open Library API

</div>
