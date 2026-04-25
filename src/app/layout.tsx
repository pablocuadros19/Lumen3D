import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "LUMEN 3D — Materiales Educativos Impresos en 3D",
  description: "Catálogo y configurador de materiales educativos impresos en 3D. Tangrams, geometría y más.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
