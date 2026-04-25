import Link from 'next/link'
import Image from 'next/image'
import { productos, formatPrecio, CANTIDAD_MAYORISTA } from '@/lib/productos'

export default function Home() {
  const destacados = productos.filter(p => p.destacado && p.activo)
  const todos = productos.filter(p => p.activo)

  return (
    <div className="min-h-screen bg-white text-lumen-blue overflow-hidden">

      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-gray-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo-lumen3d.png"
                alt="LUMEN 3D"
                width={56}
                height={56}
                priority
                className="h-14 w-14 object-contain"
              />
              <span className="hidden sm:inline text-base font-bold tracking-tight text-lumen-blue">
                LUMEN <span className="text-lumen-bordo">3D</span>
              </span>
            </Link>

            <nav className="hidden sm:flex items-center gap-8 text-sm font-medium">
              <a href="#catalogo" className="text-lumen-blue hover:text-lumen-bordo transition-colors">
                Catálogo
              </a>
              <a href="#contacto" className="text-gray-500 hover:text-lumen-blue transition-colors">
                Contacto
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-lumen-blue/[0.03] via-transparent to-lumen-bordo/[0.03]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-lumen-lightblue/[0.06] blur-[120px] -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-lumen-bordo/[0.05] blur-[100px] translate-y-1/3 -translate-x-1/3" />

        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in-up">
          <p className="text-xs sm:text-sm font-semibold tracking-[3px] uppercase text-lumen-bordo mb-6">
            Materiales educativos impresos en 3D
          </p>

          <div className="flex justify-center mb-6">
            <Image
              src="/logo-lumen3d.png"
              alt="LUMEN 3D"
              width={220}
              height={220}
              priority
              className="w-36 sm:w-44 md:w-52 h-auto"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] mb-6 tracking-tight">
            Aprender tocando.{' '}
            <span className="text-gradient-lumen">
              Crear jugando.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Piezas educativas impresas en 3D con soporte pedagógico.
            Tangrams, puzzles y más — diseñados para el aula argentina.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#catalogo"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl
                         bg-gradient-to-r from-lumen-blue to-lumen-lightblue text-white
                         font-semibold text-lg shadow-lg
                         hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Ver catálogo
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Destacados */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent via-lumen-bg to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[3px] uppercase text-lumen-bordo mb-3">
              Destacados
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              Los más pedidos
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destacados.map((prod, i) => (
              <ProductoCard key={prod.id} producto={prod} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Catálogo completo */}
      <section id="catalogo" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[3px] uppercase text-lumen-lightblue mb-4">
              Catálogo completo
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-6">
              Todos los{' '}
              <span className="text-gradient-lumen">productos</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {todos.length} productos disponibles. Todos con colores personalizables
              y opción de logo institucional grabado.
            </p>
          </div>

          <div className="w-24 h-1 bg-gradient-to-r from-lumen-blue via-lumen-lightblue to-lumen-bordo rounded-full mx-auto mb-16" />

          {(() => {
            const categorias: { key: typeof todos[0]['categoria']; titulo: string; color: string }[] = [
              { key: 'tangram', titulo: 'Tangrams', color: 'bg-lumen-bordo' },
              { key: 'puzzle', titulo: 'Puzzles y Desafíos', color: 'bg-lumen-lightblue' },
              { key: 'geometria', titulo: 'Matemática y Geometría', color: 'bg-violet-500' },
              { key: 'biologia', titulo: 'Modelos Didácticos', color: 'bg-emerald-500' },
              { key: 'lectura', titulo: 'Apoyo a la Lectura', color: 'bg-amber-500' },
              { key: 'institucional', titulo: 'Productos Institucionales', color: 'bg-lumen-blue' },
            ]
            return categorias.map((cat, idx) => {
              const items = todos.filter(p => p.categoria === cat.key)
              if (items.length === 0) return null
              return (
                <div key={cat.key} className={idx < categorias.length - 1 ? 'mb-16' : ''}>
                  <h3 className="text-xl font-bold text-lumen-blue mb-6 flex items-center gap-2">
                    <span className={`w-1.5 h-6 rounded-full ${cat.color}`} />
                    {cat.titulo}
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((prod, i) => (
                      <ProductoCard key={prod.id} producto={prod} index={i} />
                    ))}
                  </div>
                </div>
              )
            })
          })()}
        </div>
      </section>

      {/* Info: por qué LUMEN 3D */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent via-lumen-bg to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[3px] uppercase text-lumen-lightblue mb-4">
              Por qué elegirnos
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              Hecho para el aula
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                titulo: 'Colores personalizables',
                texto: 'Cada pieza se imprime en el color que elijas. Armá combinaciones únicas para tu escuela.',
                icono: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                  </svg>
                ),
              },
              {
                titulo: 'Logo institucional',
                texto: 'Grabamos el logo de tu escuela en cada pieza. Ideal para regalos y eventos.',
                icono: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                ),
              },
              {
                titulo: 'Alta durabilidad',
                texto: 'Impresos en PLA de alta calidad. Resisten el uso diario en el aula sin problemas.',
                icono: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.titulo}
                className="bg-white rounded-2xl p-8 border border-gray-100
                           shadow-card hover:shadow-card-hover
                           transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-lumen-bordo/10 text-lumen-bordo
                               flex items-center justify-center mb-5">
                  {item.icono}
                </div>
                <h3 className="text-lg font-bold mb-3 text-lumen-blue">{item.titulo}</h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">{item.texto}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 p-6 rounded-2xl bg-lumen-blue-light/50 border border-lumen-blue/10">
            <p className="text-sm text-lumen-blue font-medium">
              Precio especial a partir de {CANTIDAD_MAYORISTA} unidades en todos los productos
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-6">
            ¿Querés armar un{' '}
            <span className="text-gradient-lumen">pedido?</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10">
            Elegí los productos, contanos colores y cantidad,
            y te armamos un presupuesto. Sin compromiso.
          </p>
          <a
            href="https://wa.me/5491156187931?text=Hola%20LUMEN%203D%2C%20quiero%20armar%20un%20pedido"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl
                       bg-gradient-to-r from-lumen-bordo to-lumen-blue text-white
                       font-semibold text-lg shadow-lg
                       hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Consultar por WhatsApp
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-lumen3d.png"
              alt="LUMEN 3D"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-gray-400 text-sm">Materiales educativos 3D</span>
          </div>
          <div className="text-sm text-gray-400">
            Un proyecto de{' '}
            <span className="font-medium text-lumen-blue">LUMEN</span>
            {' '}— Plataforma Pedagógica Inteligente
          </div>
        </div>
      </footer>
    </div>
  )
}

// Componente de card de producto
function ProductoCard({ producto, index }: { producto: typeof productos[0]; index: number }) {
  const mensajeWhatsApp = encodeURIComponent(
    `Hola LUMEN 3D, me interesa el ${producto.nombre}. ¿Me podés pasar más información?`
  )

  return (
    <div
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100
                 shadow-card hover:shadow-card-hover hover:-translate-y-1
                 transition-all duration-300 flex flex-col
                 animate-fade-in-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Imagen del producto */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f8f9fc]">
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          fill
          className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {producto.destacado && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold
                          bg-white/95 text-lumen-bordo backdrop-blur-sm
                          shadow-sm border border-lumen-bordo/15 z-10">
            ★ Destacado
          </div>
        )}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold
                        bg-white/95 text-gray-500 backdrop-blur-sm
                        shadow-sm border border-gray-200/60 z-10 capitalize">
          {producto.categoria}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-lumen-blue mb-1.5 leading-tight">
          {producto.nombre}
        </h3>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed line-clamp-2">
          {producto.descripcionCorta}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {producto.coloresPersonalizables && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold
                            bg-lumen-bordo/8 text-lumen-bordo">
              Colores a elección
            </span>
          )}
          {producto.logoInstitucional && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold
                            bg-lumen-blue/8 text-lumen-blue">
              Logo institucional
            </span>
          )}
        </div>

        {/* Precios */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
              Precio
            </span>
            <span className="text-xl font-black text-lumen-blue">
              {formatPrecio(producto.precio)}
            </span>
          </div>
          {producto.precioMayorista < producto.precio ? (
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-[10px] text-gray-400">
                Desde {CANTIDAD_MAYORISTA} ud.
              </span>
              <span className="text-sm font-bold text-lumen-bordo">
                {formatPrecio(producto.precioMayorista)}
              </span>
            </div>
          ) : (
            <div className="mb-4" />
          )}

          {/* CTA WhatsApp */}
          <a
            href={`https://wa.me/5491156187931?text=${mensajeWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                       bg-gradient-to-r from-lumen-bordo to-[#6d1b41] text-white
                       text-sm font-semibold
                       hover:shadow-lg hover:shadow-lumen-bordo/25 hover:-translate-y-0.5
                       transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
            </svg>
            Consultar
          </a>
        </div>
      </div>
    </div>
  )
}
