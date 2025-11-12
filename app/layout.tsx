import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "SemBook - Encuentra tus libros favoritos",
  description:
    "Busca libros usando Open Library y guarda tus favoritos. Explora millones de libros y crea tu biblioteca personal.",
  keywords: ["libros", "búsqueda", "Open Library", "favoritos", "lectura"],
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Header />
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
