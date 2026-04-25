const productos = [
  'juego-vika',
  'tangram-triangulo',
  'tangram-corazon',
  'tangram-huevo',
  'tangram-circular',
  'pizza-puzzle',
  'mini-hexagonal',
  'desafio-hexagonal',
  'regla-lectura',
]

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] p-6">
      <h1 className="text-2xl font-bold text-[#1A3A5C] mb-6">
        Preview de geometrías extraídas de los 3MF
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Cada color es una pieza diferente. El número indica el índice. Revisá si coinciden con los productos reales.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map(slug => (
          <div key={slug} className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
            <h2 className="text-sm font-bold text-[#1A3A5C] mb-2">{slug}</h2>
            <img
              src={`/previews/preview_${slug}.svg`}
              alt={slug}
              className="w-full aspect-square object-contain bg-gray-50 rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
