// Geometrías SVG para el configurador de colores de cada producto

// ==================== HELPERS ====================

const toRad = (deg: number) => deg * Math.PI / 180
const r = (n: number) => Math.round(n * 10) / 10

function ellipsePoint(cx: number, cy: number, rx: number, ry: number, deg: number) {
  return { x: r(cx + rx * Math.cos(toRad(deg))), y: r(cy - ry * Math.sin(toRad(deg))) }
}

// Sector de elipse (porción de torta desde el centro)
function sectorPath(cx: number, cy: number, rx: number, ry: number, d1: number, d2: number): string {
  const p1 = ellipsePoint(cx, cy, rx, ry, d1)
  const p2 = ellipsePoint(cx, cy, rx, ry, d2)
  const la = Math.abs(d2 - d1) > 180 ? 1 : 0
  return `M ${cx},${cy} L ${p1.x},${p1.y} A ${rx},${ry} 0 ${la},0 ${p2.x},${p2.y} Z`
}

// Sector de anillo (dona)
function ringPath(cx: number, cy: number, ro: number, ri: number, d1: number, d2: number): string {
  const o1 = ellipsePoint(cx, cy, ro, ro, d1), o2 = ellipsePoint(cx, cy, ro, ro, d2)
  const i1 = ellipsePoint(cx, cy, ri, ri, d1), i2 = ellipsePoint(cx, cy, ri, ri, d2)
  const la = Math.abs(d2 - d1) > 180 ? 1 : 0
  return `M ${i1.x},${i1.y} L ${o1.x},${o1.y} A ${ro},${ro} 0 ${la},0 ${o2.x},${o2.y} L ${i2.x},${i2.y} A ${ri},${ri} 0 ${la},1 ${i1.x},${i1.y} Z`
}

// Hexágono flat-top: polygon points
function hexPoints(cx: number, cy: number, s: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = toRad(60 * i)
    return `${r(cx + s * Math.cos(a))},${r(cy + s * Math.sin(a))}`
  }).join(' ')
}

// Centro de celda hex en coordenadas axiales (flat-top)
function hexCenter(q: number, rr: number, s: number, ox: number, oy: number) {
  return {
    x: r(ox + s * 1.5 * q),
    y: r(oy + s * Math.sqrt(3) * (rr + q / 2)),
  }
}

// Generar elementos hex para un grupo de celdas
function hexGroupElements(
  cells: [number, number][],
  grupoId: string,
  size: number,
  ox: number,
  oy: number
): Elemento[] {
  return cells.map(([q, rr]) => {
    const c = hexCenter(q, rr, size, ox, oy)
    return { grupoId, tipo: 'polygon' as const, d: hexPoints(c.x, c.y, size * 0.92) }
  })
}

// ==================== TYPES ====================

export interface Grupo {
  id: string
  nombre: string
}

export interface Elemento {
  grupoId: string
  tipo: 'polygon' | 'path'
  d: string
}

export interface ConfigProducto {
  slug: string
  nombre: string
  viewBox: string
  grupos: Grupo[]
  elementos: Elemento[]
  coloresDefault: string[]
}

// ==================== PRODUCTOS ====================

// 1. GRAN TANGRAM — 7 piezas clásicas chinas en cuadrado 200x200
const granTangram: ConfigProducto = {
  slug: 'gran-tangram',
  nombre: 'Gran Tangram',
  viewBox: '-5 -5 210 210',
  grupos: [
    { id: 'tg1', nombre: 'Triángulo grande 1' },
    { id: 'tg2', nombre: 'Triángulo grande 2' },
    { id: 'tm', nombre: 'Triángulo mediano' },
    { id: 'tc1', nombre: 'Triángulo chico 1' },
    { id: 'tc2', nombre: 'Triángulo chico 2' },
    { id: 'cu', nombre: 'Cuadrado' },
    { id: 'pa', nombre: 'Paralelogramo' },
  ],
  elementos: [
    { grupoId: 'tg1', tipo: 'polygon', d: '0,0 200,0 100,100' },
    { grupoId: 'tg2', tipo: 'polygon', d: '0,0 0,200 100,100' },
    { grupoId: 'tm', tipo: 'polygon', d: '0,200 100,200 100,100' },
    { grupoId: 'tc1', tipo: 'polygon', d: '100,100 100,200 150,150' },
    { grupoId: 'tc2', tipo: 'polygon', d: '200,0 200,100 150,50' },
    { grupoId: 'cu', tipo: 'polygon', d: '100,100 150,50 200,100 150,150' },
    { grupoId: 'pa', tipo: 'polygon', d: '200,100 200,200 100,200 150,150' },
  ],
  coloresDefault: ['#E53E3E', '#ED8936', '#ECC94B', '#38A169', '#4FD1C5', '#3182CE', '#805AD5'],
}

// 2. TANGRAM TRIÁNGULO — 7 piezas, vértice arriba centrado, base abajo
// A(100,20) vértice, B(10,190) base-izq, C(190,190) base-der
// D=mid(AB)=(55,105), E=mid(AC)=(145,105), F=mid(BC)=(100,190)
// H=mid(AD)=(77.5,62.5), I=mid(AE)=(122.5,62.5), G=(100,150) centro-inferior
const triangulo: ConfigProducto = {
  slug: 'tangram-triangulo',
  nombre: 'Tangram Triángulo',
  viewBox: '0 10 200 190',
  grupos: [
    { id: 't1', nombre: 'Punta superior' },
    { id: 't2', nombre: 'Trapezoide superior' },
    { id: 't3', nombre: 'Triángulo lateral izq.' },
    { id: 't4', nombre: 'Triángulo lateral der.' },
    { id: 't5', nombre: 'Triángulo central sup.' },
    { id: 't6', nombre: 'Triángulo central izq.' },
    { id: 't7', nombre: 'Triángulo central der.' },
  ],
  elementos: [
    { grupoId: 't1', tipo: 'polygon', d: '100,20 77.5,62.5 122.5,62.5' },
    { grupoId: 't2', tipo: 'polygon', d: '77.5,62.5 122.5,62.5 145,105 55,105' },
    { grupoId: 't3', tipo: 'polygon', d: '10,190 55,105 100,190' },
    { grupoId: 't4', tipo: 'polygon', d: '190,190 145,105 100,190' },
    { grupoId: 't5', tipo: 'polygon', d: '55,105 145,105 100,150' },
    { grupoId: 't6', tipo: 'polygon', d: '55,105 100,150 100,190' },
    { grupoId: 't7', tipo: 'polygon', d: '145,105 100,150 100,190' },
  ],
  coloresDefault: ['#3182CE', '#ECC94B', '#E53E3E', '#38A169', '#805AD5', '#ED8936', '#4FD1C5'],
}

// 3. TANGRAM CORAZÓN — 8 piezas: diamante dividido + 2 lóbulos circulares
// T(100,55), R(190,115), B(100,195), L(10,115), M(100,115) centro
// mTL=(55,85), mTR=(145,85), mLB=(55,155), mRB=(145,155)
const corazon: ConfigProducto = {
  slug: 'tangram-corazon',
  nombre: 'Tangram Corazón',
  viewBox: '0 20 200 180',
  grupos: [
    { id: 'h1', nombre: 'Lóbulo izquierdo' },
    { id: 'h2', nombre: 'Lóbulo derecho' },
    { id: 'h3', nombre: 'Triángulo sup. izq.' },
    { id: 'h4', nombre: 'Triángulo sup. der.' },
    { id: 'h5', nombre: 'Cuadrilátero izq.' },
    { id: 'h6', nombre: 'Cuadrilátero der.' },
    { id: 'h7', nombre: 'Triángulo inf. izq.' },
    { id: 'h8', nombre: 'Triángulo inf. der.' },
  ],
  elementos: [
    { grupoId: 'h1', tipo: 'path', d: 'M 10,115 A 54.1,54.1 0 0,1 100,55 Z' },
    { grupoId: 'h2', tipo: 'path', d: 'M 100,55 A 54.1,54.1 0 0,1 190,115 Z' },
    { grupoId: 'h3', tipo: 'polygon', d: '100,55 55,85 100,115' },
    { grupoId: 'h4', tipo: 'polygon', d: '100,55 145,85 100,115' },
    { grupoId: 'h5', tipo: 'polygon', d: '10,115 55,85 100,115 55,155' },
    { grupoId: 'h6', tipo: 'polygon', d: '190,115 145,85 100,115 145,155' },
    { grupoId: 'h7', tipo: 'polygon', d: '100,195 55,155 100,115' },
    { grupoId: 'h8', tipo: 'polygon', d: '100,195 145,155 100,115' },
  ],
  coloresDefault: ['#E53E3E', '#1A202C', '#1A202C', '#E53E3E', '#E53E3E', '#1A202C', '#E53E3E', '#1A202C'],
}

// 4. TANGRAM HUEVO — 9 sectores con silueta real de huevo
// Parte superior: semielipse chata (ry=60). Parte inferior: semielipse alargada (ry=85).
// 4 sectores superiores (45° c/u) + 5 sectores inferiores (36° c/u)
const huevo: ConfigProducto = (() => {
  const cx = 100, cy = 100, rx = 50, ryTop = 60, ryBot = 85
  const arcos = [
    { d1: 0, d2: 45, ry: ryTop, nombre: 'Superior derecha' },
    { d1: 45, d2: 90, ry: ryTop, nombre: 'Sup. der. alta' },
    { d1: 90, d2: 135, ry: ryTop, nombre: 'Sup. izq. alta' },
    { d1: 135, d2: 180, ry: ryTop, nombre: 'Superior izquierda' },
    { d1: 180, d2: 216, ry: ryBot, nombre: 'Lateral izquierda' },
    { d1: 216, d2: 252, ry: ryBot, nombre: 'Inferior izquierda' },
    { d1: 252, d2: 288, ry: ryBot, nombre: 'Inferior centro' },
    { d1: 288, d2: 324, ry: ryBot, nombre: 'Inferior derecha' },
    { d1: 324, d2: 360, ry: ryBot, nombre: 'Lateral derecha' },
  ]
  return {
    slug: 'tangram-huevo',
    nombre: 'Tangram Huevo',
    viewBox: '35 35 130 155',
    grupos: arcos.map((a, i) => ({ id: `e${i}`, nombre: a.nombre })),
    elementos: arcos.map((a, i) => ({
      grupoId: `e${i}`,
      tipo: 'path' as const,
      d: sectorPath(cx, cy, rx, a.ry, a.d1, a.d2),
    })),
    coloresDefault: ['#E53E3E', '#4A5568', '#805AD5', '#E53E3E', '#4FD1C5', '#E53E3E', '#805AD5', '#4A5568', '#ED64A6'],
  }
})()

// 5. TANGRAM CIRCULAR — 4 cuartos exteriores (anillo) + 4 cuartos centrales
const circular: ConfigProducto = (() => {
  const cx = 100, cy = 100, ro = 85, ri = 22
  const gruposOuter = [
    { id: 'co0', nombre: 'Cuarto derecho' },
    { id: 'co1', nombre: 'Cuarto superior' },
    { id: 'co2', nombre: 'Cuarto izquierdo' },
    { id: 'co3', nombre: 'Cuarto inferior' },
  ]
  const gruposInner = [
    { id: 'ci0', nombre: 'Centro derecho' },
    { id: 'ci1', nombre: 'Centro superior' },
    { id: 'ci2', nombre: 'Centro izquierdo' },
    { id: 'ci3', nombre: 'Centro inferior' },
  ]
  const elemsOuter = gruposOuter.map((g, i) => ({
    grupoId: g.id, tipo: 'path' as const,
    d: ringPath(cx, cy, ro, ri, i * 90 - 45, (i + 1) * 90 - 45),
  }))
  const elemsInner = gruposInner.map((g, i) => ({
    grupoId: g.id, tipo: 'path' as const,
    d: sectorPath(cx, cy, ri, ri, i * 90 - 45, (i + 1) * 90 - 45),
  }))
  return {
    slug: 'tangram-circular',
    nombre: 'Tangram Circular',
    viewBox: '10 10 180 180',
    grupos: [...gruposOuter, ...gruposInner],
    elementos: [...elemsOuter, ...elemsInner],
    coloresDefault: ['#4FD1C5', '#4FD1C5', '#4FD1C5', '#4FD1C5', '#E53E3E', '#1A202C', '#E53E3E', '#1A202C'],
  }
})()

// 6. DESAFÍO HEXAGONAL — 19 celdas hex en 10 grupos
const desafioHexagonal: ConfigProducto = (() => {
  const s = 16, ox = 100, oy = 100
  const groups: { id: string; nombre: string; cells: [number, number][] }[] = [
    { id: 'dh0', nombre: 'Pieza central', cells: [[0, 0]] },
    { id: 'dh1', nombre: 'Pieza 2', cells: [[1, 0], [2, 0]] },
    { id: 'dh2', nombre: 'Pieza 3', cells: [[1, -1]] },
    { id: 'dh3', nombre: 'Pieza 4', cells: [[2, -1], [2, -2]] },
    { id: 'dh4', nombre: 'Pieza 5', cells: [[0, -1], [1, -2]] },
    { id: 'dh5', nombre: 'Pieza 6', cells: [[0, -2], [-1, -1]] },
    { id: 'dh6', nombre: 'Pieza 7', cells: [[-1, 0], [-2, 0]] },
    { id: 'dh7', nombre: 'Pieza 8', cells: [[-1, 1], [-2, 1], [-2, 2]] },
    { id: 'dh8', nombre: 'Pieza 9', cells: [[0, 1], [-1, 2]] },
    { id: 'dh9', nombre: 'Pieza 10', cells: [[0, 2], [1, 1]] },
  ]
  const elementos = groups.flatMap(g => hexGroupElements(g.cells, g.id, s, ox, oy))
  return {
    slug: 'desafio-hexagonal',
    nombre: 'Desafío Hexagonal',
    viewBox: '25 25 150 150',
    grupos: groups.map(g => ({ id: g.id, nombre: g.nombre })),
    elementos,
    coloresDefault: ['#9B2C2C', '#F7FAFC', '#9B2C2C', '#F7FAFC', '#9B2C2C', '#F7FAFC', '#9B2C2C', '#F7FAFC', '#9B2C2C', '#F7FAFC'],
  }
})()

// 7. MINI HEXAGONAL — 7 celdas hex, cada una un grupo
const miniHexagonal: ConfigProducto = (() => {
  const s = 28, ox = 100, oy = 100
  const groups: { id: string; nombre: string; cells: [number, number][] }[] = [
    { id: 'mh0', nombre: 'Centro', cells: [[0, 0]] },
    { id: 'mh1', nombre: 'Derecho', cells: [[1, 0]] },
    { id: 'mh2', nombre: 'Sup. derecho', cells: [[1, -1]] },
    { id: 'mh3', nombre: 'Sup. izquierdo', cells: [[0, -1]] },
    { id: 'mh4', nombre: 'Izquierdo', cells: [[-1, 0]] },
    { id: 'mh5', nombre: 'Inf. izquierdo', cells: [[-1, 1]] },
    { id: 'mh6', nombre: 'Inf. derecho', cells: [[0, 1]] },
  ]
  const elementos = groups.flatMap(g => hexGroupElements(g.cells, g.id, s, ox, oy))
  return {
    slug: 'mini-hexagonal',
    nombre: 'Mini Hexagonal',
    viewBox: '0 0 200 200',
    grupos: groups.map(g => ({ id: g.id, nombre: g.nombre })),
    elementos,
    coloresDefault: ['#E53E3E', '#E53E3E', '#E53E3E', '#E53E3E', '#E53E3E', '#E53E3E', '#E53E3E'],
  }
})()

// ==================== EXPORTS ====================

export const configuraciones: ConfigProducto[] = [
  granTangram,
  triangulo,
  corazon,
  huevo,
  circular,
  desafioHexagonal,
  miniHexagonal,
]

export function getConfigBySlug(slug: string): ConfigProducto | undefined {
  return configuraciones.find(c => c.slug === slug)
}

// Paletas predefinidas para combos
export const PALETAS_COMBO = [
  { nombre: 'Arcoíris', colores: ['#E53E3E', '#ED8936', '#ECC94B', '#38A169', '#4FD1C5', '#3182CE', '#805AD5', '#ED64A6', '#FC8181', '#D69E2E'] },
  { nombre: 'Rojo y Azul', colores: ['#E53E3E', '#1A202C'] },
  { nombre: 'Rojo y Blanco', colores: ['#E53E3E', '#F7FAFC'] },
  { nombre: 'Océano', colores: ['#3182CE', '#4FD1C5', '#0BC5EA', '#2B6CB0', '#38B2AC', '#2C7A7B', '#4299E1'] },
  { nombre: 'Atardecer', colores: ['#E53E3E', '#ED8936', '#ECC94B', '#FC8181', '#F6AD55', '#ED64A6', '#D69E2E'] },
  { nombre: 'Bosque', colores: ['#38A169', '#68D391', '#2F855A', '#48BB78', '#276749', '#9AE6B4', '#22543D'] },
]

// Distribuir N colores desde una paleta
export function distribuirColores(paleta: string[], n: number): string[] {
  return Array.from({ length: n }, (_, i) => paleta[i % paleta.length])
}

// Colores PLA disponibles para selección individual
export const COLORES_PLA = [
  { nombre: 'Rojo', hex: '#E53E3E' },
  { nombre: 'Naranja', hex: '#ED8936' },
  { nombre: 'Amarillo', hex: '#ECC94B' },
  { nombre: 'Verde', hex: '#38A169' },
  { nombre: 'Celeste', hex: '#4FD1C5' },
  { nombre: 'Azul', hex: '#3182CE' },
  { nombre: 'Violeta', hex: '#805AD5' },
  { nombre: 'Rosa', hex: '#ED64A6' },
  { nombre: 'Blanco', hex: '#F7FAFC' },
  { nombre: 'Negro', hex: '#1A202C' },
  { nombre: 'Gris', hex: '#A0AEC0' },
  { nombre: 'Bordo', hex: '#9B2C2C' },
  { nombre: 'Dorado', hex: '#D69E2E' },
  { nombre: 'Turquesa', hex: '#0BC5EA' },
  { nombre: 'Lima', hex: '#68D391' },
  { nombre: 'Coral', hex: '#FC8181' },
]
