'use client'

import { useState, useRef, useCallback } from 'react'
import type { ConfigProducto } from '@/lib/configuraciones'
import { PALETAS_COMBO, distribuirColores, COLORES_PLA } from '@/lib/configuraciones'

interface Props {
  config: ConfigProducto
}

export default function ProductoConfigurador({ config }: Props) {
  const [colores, setColores] = useState<string[]>([...config.coloresDefault])
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<number | null>(null)
  const [nombreVariante, setNombreVariante] = useState('')
  const [variantes, setVariantes] = useState<{ nombre: string; colores: string[] }[]>([])
  const svgRef = useRef<SVGSVGElement>(null)

  // Mapa grupoId → índice para lookup rápido
  const grupoIdToIndex = Object.fromEntries(config.grupos.map((g, i) => [g.id, i]))

  const cambiarColor = useCallback((grupoIndex: number, color: string) => {
    setColores(prev => {
      const next = [...prev]
      next[grupoIndex] = color
      return next
    })
  }, [])

  const aplicarCombo = useCallback((paleta: string[]) => {
    setColores(distribuirColores(paleta, config.grupos.length))
    setGrupoSeleccionado(null)
  }, [config.grupos.length])

  const guardarVariante = useCallback(() => {
    const nombre = nombreVariante.trim() || `Variante ${variantes.length + 1}`
    setVariantes(prev => [...prev, { nombre, colores: [...colores] }])
    setNombreVariante('')
  }, [nombreVariante, colores, variantes.length])

  const exportarImagen = useCallback(async () => {
    if (!svgRef.current) return
    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 800
      canvas.height = 800
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, 800, 800)
      ctx.drawImage(img, 0, 0, 800, 800)

      const link = document.createElement('a')
      link.download = `${config.slug}-${(nombreVariante || 'custom').toLowerCase().replace(/\s+/g, '-')}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      URL.revokeObjectURL(url)
    }
    img.src = url
  }, [config.slug, nombreVariante])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Preview SVG */}
      <div className="flex flex-col items-center gap-6">
        <div className="bg-white rounded-3xl p-8 shadow-card border border-gray-100/80 w-full max-w-md">
          <svg
            ref={svgRef}
            viewBox={config.viewBox}
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {config.elementos.map((elem, i) => {
              const gi = grupoIdToIndex[elem.grupoId]
              const isSelected = grupoSeleccionado === gi
              const anySelected = grupoSeleccionado !== null

              const commonProps = {
                key: i,
                fill: colores[gi],
                stroke: '#ffffff',
                strokeWidth: 2,
                strokeLinejoin: 'round' as const,
                className: 'cursor-pointer',
                style: {
                  filter: isSelected ? 'drop-shadow(0 0 8px rgba(139, 34, 82, 0.4))' : 'none',
                  opacity: anySelected && !isSelected ? 0.5 : 1,
                  transition: 'all 0.2s',
                },
                onClick: () => setGrupoSeleccionado(isSelected ? null : gi),
              }

              return elem.tipo === 'polygon'
                ? <polygon {...commonProps} points={elem.d} />
                : <path {...commonProps} d={elem.d} />
            })}
          </svg>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={exportarImagen}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                       bg-gradient-to-r from-lumen-blue to-lumen-lightblue text-white
                       font-semibold text-sm shadow-lg
                       hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Descargar PNG
          </button>
          <button
            onClick={guardarVariante}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                       border-2 border-lumen-bordo text-lumen-bordo
                       font-semibold text-sm
                       hover:bg-lumen-bordo-light transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
            Guardar variante
          </button>
        </div>
      </div>

      {/* Panel de controles */}
      <div className="flex flex-col gap-6">
        {/* Nombre de variante */}
        <div>
          <label className="text-xs font-bold tracking-[2px] uppercase text-lumen-blue/50 mb-2 block">
            Nombre de la variante
          </label>
          <input
            type="text"
            value={nombreVariante}
            onChange={e => setNombreVariante(e.target.value)}
            placeholder="Ej: Arcoíris, Océano..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                       text-sm font-medium text-lumen-blue
                       focus:outline-none focus:ring-2 focus:ring-lumen-blue/10 focus:border-lumen-blue/30
                       transition-all duration-200"
          />
        </div>

        {/* Combos predefinidos */}
        <div>
          <label className="text-xs font-bold tracking-[2px] uppercase text-lumen-blue/50 mb-3 block">
            Combinaciones rápidas
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PALETAS_COMBO.map(combo => (
              <button
                key={combo.nombre}
                onClick={() => aplicarCombo(combo.colores)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100
                           hover:border-lumen-bordo/30 hover:shadow-md transition-all duration-200
                           bg-white group"
              >
                <div className="flex gap-0.5">
                  {distribuirColores(combo.colores, Math.min(config.grupos.length, 7)).map((c, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-gray-500 group-hover:text-lumen-bordo transition-colors">
                  {combo.nombre}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Color por grupo/pieza */}
        <div>
          <label className="text-xs font-bold tracking-[2px] uppercase text-lumen-blue/50 mb-3 block">
            Color por pieza
            <span className="normal-case tracking-normal font-normal text-gray-400 ml-2">
              (tocá una pieza en la figura o elegí abajo)
            </span>
          </label>
          <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-1">
            {config.grupos.map((grupo, gi) => (
              <div
                key={grupo.id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer
                  ${grupoSeleccionado === gi
                    ? 'border-lumen-bordo/40 bg-lumen-bordo-light/50 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                onClick={() => setGrupoSeleccionado(grupoSeleccionado === gi ? null : gi)}
              >
                <div
                  className="w-8 h-8 rounded-lg border-2 border-white shadow-md flex-shrink-0"
                  style={{ backgroundColor: colores[gi] }}
                />
                <span className="text-sm font-medium text-lumen-blue flex-1 min-w-0 truncate">
                  {grupo.nombre}
                </span>
                <div className="flex gap-1 flex-shrink-0">
                  {COLORES_PLA.slice(0, 8).map(color => (
                    <button
                      key={color.hex}
                      onClick={e => { e.stopPropagation(); cambiarColor(gi, color.hex) }}
                      className={`w-5 h-5 rounded-full border-2 transition-transform duration-150 hover:scale-125
                        ${colores[gi] === color.hex ? 'border-lumen-bordo scale-110' : 'border-white shadow-sm'}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.nombre}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Paleta completa para pieza seleccionada */}
        {grupoSeleccionado !== null && (
          <div className="animate-fade-in-up">
            <label className="text-xs font-bold tracking-[2px] uppercase text-lumen-bordo/70 mb-3 block">
              Todos los colores — {config.grupos[grupoSeleccionado].nombre}
            </label>
            <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-white border border-lumen-bordo/10">
              {COLORES_PLA.map(color => (
                <button
                  key={color.hex}
                  onClick={() => cambiarColor(grupoSeleccionado, color.hex)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-150
                    hover:bg-gray-50
                    ${colores[grupoSeleccionado] === color.hex ? 'ring-2 ring-lumen-bordo ring-offset-2' : ''}`}
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-[10px] font-medium text-gray-500">{color.nombre}</span>
                </button>
              ))}
              {/* Color custom */}
              <div className="flex flex-col items-center gap-1 p-2 rounded-lg">
                <label className="relative cursor-pointer">
                  <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </div>
                  <input
                    type="color"
                    value={colores[grupoSeleccionado]}
                    onChange={e => cambiarColor(grupoSeleccionado, e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </label>
                <span className="text-[10px] font-medium text-gray-500">Custom</span>
              </div>
            </div>
          </div>
        )}

        {/* Variantes guardadas */}
        {variantes.length > 0 && (
          <div>
            <label className="text-xs font-bold tracking-[2px] uppercase text-lumen-blue/50 mb-3 block">
              Variantes guardadas
            </label>
            <div className="flex flex-col gap-2">
              {variantes.map((v, i) => (
                <button
                  key={i}
                  onClick={() => { setColores([...v.colores]); setNombreVariante(v.nombre) }}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100
                             bg-white hover:border-lumen-blue/20 hover:shadow-sm
                             transition-all duration-200 text-left"
                >
                  <div className="flex gap-0.5 flex-shrink-0">
                    {v.colores.slice(0, 7).map((c, j) => (
                      <div key={j} className="w-4 h-4 rounded-full border border-white shadow-sm" style={{ backgroundColor: c }} />
                    ))}
                    {v.colores.length > 7 && (
                      <span className="text-[10px] text-gray-400 self-center ml-1">+{v.colores.length - 7}</span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-lumen-blue">{v.nombre}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Resumen para copiar */}
        <div className="p-4 rounded-xl bg-lumen-blue-light/50 border border-lumen-blue/10">
          <label className="text-xs font-bold tracking-[2px] uppercase text-lumen-blue/50 mb-2 block">
            Resumen para copiar
          </label>
          <p className="text-xs text-gray-600 font-mono leading-relaxed select-all break-all">
            {config.nombre}: {config.grupos.map((g, i) => `${g.nombre}: ${colores[i]}`).join(' · ')}
          </p>
        </div>
      </div>
    </div>
  )
}
