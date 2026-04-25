'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ProductoConfigurador from '@/components/ProductoConfigurador'
import { configuraciones } from '@/lib/configuraciones'
import { productos } from '@/lib/productos'

export default function ConfiguradorPage() {
  const [slugActivo, setSlugActivo] = useState(configuraciones[0].slug)
  const configActiva = configuraciones.find(c => c.slug === slugActivo)!

  // Buscar imagen del producto en el catálogo
  const productoData = productos.find(p => p.slug === slugActivo)

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-gray-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-lumen3d.png"
                alt="LUMEN 3D"
                width={48}
                height={48}
                priority
                className="h-12 w-auto"
              />
            </Link>
            <nav className="hidden sm:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-gray-500 hover:text-[#1A3A5C] transition-colors">
                Catálogo
              </Link>
              <span className="text-sm font-semibold text-[#8B2252]">
                Configurador
              </span>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Título */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-[3px] uppercase text-[#8B2252] mb-3">
            Herramienta
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1A3A5C] leading-tight mb-3">
            Configurador de{' '}
            <span className="text-gradient-lumen">colores</span>
          </h1>
          <p className="text-gray-500 max-w-2xl leading-relaxed">
            Elegí un producto y personalizá los colores de cada pieza.
            Podés usar combinaciones predefinidas o armar la tuya.
          </p>
        </div>

        {/* Selector de producto */}
        <div className="mb-10">
          <label className="text-xs font-bold tracking-[2px] uppercase text-[#1A3A5C]/50 mb-4 block">
            Elegí el producto
          </label>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {configuraciones.map(config => {
              const prod = productos.find(p => p.slug === config.slug)
              const isActive = slugActivo === config.slug
              return (
                <button
                  key={config.slug}
                  onClick={() => setSlugActivo(config.slug)}
                  className={`flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-200
                    ${isActive
                      ? 'border-[#8B2252] bg-[#F5E8EE] shadow-md'
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                    }`}
                >
                  {/* Thumbnail del producto */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-[#1A3A5C]/6 to-[#8B2252]/8 relative">
                    {prod?.imagen && (
                      <Image
                        src={prod.imagen}
                        alt={config.nombre}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    )}
                  </div>
                  <span className={`text-[11px] sm:text-xs font-semibold text-center leading-tight max-w-[80px]
                    ${isActive ? 'text-[#8B2252]' : 'text-gray-500'}`}>
                    {config.nombre}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Info del producto seleccionado */}
        {productoData && (
          <div className="mb-8 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 relative flex-shrink-0">
              <Image src={productoData.imagen} alt={productoData.nombre} fill className="object-cover" sizes="48px" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1A3A5C]">{configActiva.nombre}</h2>
              <p className="text-sm text-gray-500">{configActiva.grupos.length} piezas configurables</p>
            </div>
          </div>
        )}

        {/* Configurador */}
        <ProductoConfigurador key={slugActivo} config={configActiva} />
      </main>
    </div>
  )
}
