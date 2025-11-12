<div align="center">

# 📚 SemBook - Aplicación de Búsqueda de Libros

### Aplicación web moderna para buscar y gestionar tu biblioteca personal

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-4-orange?style=for-the-badge)](https://github.com/pmndrs/zustand)

[🚀 Demo en Vivo](#) • [📖 Documentación](#características) • [🐛 Reportar Bug](../../issues)

---

</div>

## 📋 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características](#-características)
- [Tecnologías](#️-tecnologías)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Funcionalidades](#-funcionalidades-detalladas)
- [Testing](#-testing)
- [Licencia](#-licencia)

---

## 🎯 Acerca del Proyecto

**SemBook** es una aplicación web desarrollada con **Next.js 14** que permite a los usuarios buscar libros, ver información detallada y gestionar una lista personalizada de favoritos. Utiliza la **API pública de Open Library** para acceder a millones de libros e implementa **Server-Side Rendering (SSR)** para optimizar el rendimiento y SEO.

### ¿Por qué SemBook?

- ✅ **Rápido**: SSR y caché optimizado para respuestas instantáneas
- ✅ **Intuitivo**: Interfaz limpia y fácil de usar
- ✅ **Completo**: Búsqueda, detalles y gestión de favoritos
- ✅ **Moderno**: Tecnologías de última generación
- ✅ **Responsive**: Funciona en todos los dispositivos

---

## ✨ Características

<table>
<tr>
<td width="50%">

### 🔍 Búsqueda Avanzada
- Búsqueda por título en tiempo real
- Resultados renderizados en el servidor
- Manejo de estados de carga y error
- Grid responsive de resultados

</td>
<td width="50%">

### 📖 Detalles Completos
- Información detallada de cada libro
- Portada, autor, año, descripción
- SSR para mejor SEO
- Navegación fluida

</td>
</tr>
<tr>
<td width="50%">

### ❤️ Sistema de Favoritos
- Agregar/eliminar con un clic
- Persistencia en localStorage
- Sincronización en tiempo real
- Página dedicada de favoritos

</td>
<td width="50%">

### ⚡ Rendimiento Optimizado
- Caché multinivel
- Imágenes optimizadas
- Code splitting automático
- Tiempos de carga mínimos

</td>
</tr>
</table>

---

## 🛠️ Tecnologías

<div align="center">

| Tecnología | Versión | Propósito |
|:----------:|:-------:|:---------:|
| **Next.js** | 14.x | Framework React con SSR |
| **TypeScript** | 5.x | Tipado estático y seguridad |
| **Zustand** | 4.x | Gestión de estado global |
| **Tailwind CSS** | 3.x | Estilos y diseño responsive |
| **Jest** | Latest | Testing unitario |
| **Open Library API** | - | Fuente de datos de libros |

</div>

---

## 🚀 Instalación

### Prerrequisitos

- Node.js 18.x o superior
- npm o yarn

### Pasos de Instalación

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

La aplicación estará disponible en `http://localhost:3000` 🎉

---

## 💻 Uso

### Comandos Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo en http://localhost:3000
npm run build    # Compila la aplicación para producción
npm start        # Inicia el servidor de producción
npm test         # Ejecuta los tests unitarios
npm run lint     # Ejecuta el linter de código
```

### Flujo de Uso

1. **Buscar Libros**: Ingresa el título en la barra de búsqueda
2. **Ver Detalles**: Haz clic en cualquier libro para ver más información
3. **Agregar a Favoritos**: Usa el botón de corazón ❤️
4. **Gestionar Favoritos**: Accede a tu lista desde el menú "Favoritos"

---

## 📁 Estructura del Proyecto

```
📦 sembook
├── 📂 app/                          # Rutas y páginas de Next.js
│   ├── 📂 books/[id]/              # Página de detalles del libro
│   │   ├── 📄 page.tsx             # Componente servidor (SSR)
│   │   ├── 📄 BookDetailsClient.tsx # Componente cliente
│   │   └── 📄 not-found.tsx        # Página 404
│   ├── 📂 favorites/               # Página de favoritos
│   │   └── 📄 page.tsx             # Lista de favoritos
│   ├── 📄 layout.tsx               # Layout principal
│   ├── 📄 page.tsx                 # Página de búsqueda (SSR)
│   ├── 📄 SearchPageClient.tsx     # Cliente de búsqueda
│   ├── 📄 error.tsx                # Manejo de errores
│   └── 📄 globals.css              # Estilos globales
│
├── 📂 components/                   # Componentes reutilizables
│   ├── 📄 BookCard.tsx             # Tarjeta de libro
│   ├── 📄 FavoriteButton.tsx       # Botón de favoritos
│   ├── 📄 Header.tsx               # Navegación principal
│   ├── 📄 LoadingSpinner.tsx       # Indicador de carga
│   └── 📄 SearchBar.tsx            # Barra de búsqueda
│
├── 📂 lib/                         # Lógica de negocio
│   ├── 📂 api/                     # Cliente de API
│   │   └── 📄 openLibrary.ts       # Integración con Open Library
│   ├── 📂 store/                   # Estado global
│   │   └── 📄 useBookStore.ts      # Store de Zustand
│   └── 📂 types/                   # Definiciones TypeScript
│       └── 📄 book.ts              # Interfaces de libros
│
├── 📂 utils/                       # Funciones utilitarias
│   └── 📄 helpers.ts               # Helpers generales
│
├── 📂 __tests__/                   # Tests unitarios
│   ├── 📂 components/              # Tests de componentes
│   ├── 📂 lib/                     # Tests de lógica
│   └── 📂 utils/                   # Tests de utilidades
│
└── 📂 public/                      # Recursos estáticos
    └── 📄 favicon.svg              # Icono de la aplicación
```

---

## 🎨 Funcionalidades Detalladas

### 1️⃣ Página de Búsqueda

**Características:**
- Campo de búsqueda con validación en tiempo real
- Resultados renderizados en el servidor (SSR)
- Grid responsive que se adapta a cualquier pantalla
- Estados de carga, error y sin resultados
- Caché de búsquedas (1 hora de duración)

**Tecnologías utilizadas:**
- Server Components de Next.js para SSR
- Zustand para gestión de estado
- Tailwind CSS para diseño responsive

### 2️⃣ Página de Detalles del Libro

**Características:**
- Información completa del libro
- Portada en alta resolución
- Título, autores, año de publicación
- Descripción detallada (cuando está disponible)
- Botón de favoritos integrado
- Renderizado del lado del servidor (SSR)

**Optimizaciones:**
- Caché de 24 horas para detalles de libros
- Caché de 7 días para información de autores
- Imágenes optimizadas con Next.js Image

### 3️⃣ Sistema de Favoritos

**Características:**
- Agregar/eliminar libros con un solo clic
- Persistencia en localStorage
- Sincronización automática entre componentes
- Página dedicada para gestionar favoritos
- Contador de favoritos en el header

**Implementación:**
- Zustand con middleware de persistencia
- Actualización inmediata del UI
- Sin necesidad de recargar la página

---

## 🔧 Configuración de Caché

La aplicación implementa un sistema de caché multinivel para optimizar el rendimiento:

<div align="center">

| Recurso | Estrategia | Duración | Beneficio |
|:-------:|:----------:|:--------:|:---------:|
| **Búsquedas** | ISR (Next.js) | 1 hora | Respuestas rápidas |
| **Detalles de libros** | ISR (Next.js) | 24 horas | Reduce peticiones API |
| **Datos de autores** | Fetch cache | 7 días | Minimiza latencia |
| **Favoritos** | localStorage | Persistente | Disponible offline |

</div>

---

## 🧪 Testing

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Cobertura de tests
npm run test:coverage
```

### Cobertura Actual

- ✅ **32 tests pasando**
- ✅ Tests de componentes
- ✅ Tests de lógica de negocio
- ✅ Tests de utilidades
- ✅ Tests de integración con API

---

## 📊 Rendimiento

<div align="center">

| Métrica | Valor | Estado |
|:-------:|:-----:|:------:|
| **First Contentful Paint** | < 1.5s | ✅ Excelente |
| **Time to Interactive** | < 3s | ✅ Excelente |
| **Lighthouse Score** | 90+ | ✅ Excelente |
| **Bundle Size** | Optimizado | ✅ Code Splitting |

</div>

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas y apreciadas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

<div align="center">

**Desarrollado por [@zerohyperJ](https://github.com/zerohyperJ)**

[![GitHub](https://img.shields.io/badge/GitHub-zerohyperJ-181717?style=for-the-badge&logo=github)](https://github.com/zerohyperJ)

</div>

---

## 🙏 Agradecimientos

- [Open Library](https://openlibrary.org/) - Por proporcionar la API pública de libros
- [Next.js](https://nextjs.org/) - Por el excelente framework
- [Vercel](https://vercel.com/) - Por las herramientas de desarrollo

---

<div align="center">

### ⭐ Si te gustó este proyecto, dale una estrella en GitHub ⭐

**Hecho con ❤️ usando Next.js y Open Library API**

[⬆ Volver arriba](#-sembook---aplicación-de-búsqueda-de-libros)

</div>
