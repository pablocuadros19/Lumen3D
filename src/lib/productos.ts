export interface Producto {
  id: string
  slug: string
  nombre: string
  descripcion: string
  descripcionCorta: string
  categoria: 'tangram' | 'puzzle' | 'geometria' | 'lectura' | 'biologia' | 'institucional'
  imagen: string // ruta en /public/productos/
  precio: number // ARS - precio unitario
  precioMayorista: number // ARS - precio a partir de 6 unidades
  coloresPersonalizables: boolean
  logoInstitucional: boolean // opción de grabado de logo
  destacado: boolean
  activo: boolean
}

// Precio especial a partir de 6 unidades
export const CANTIDAD_MAYORISTA = 6

export const productos: Producto[] = [
  {
    id: '1',
    slug: 'tangram-cuadrado',
    nombre: 'Tangram Cuadrado',
    descripcion: 'El tangram clásico de 7 piezas en formato cuadrado con marco contenedor. Ideal para trabajar geometría, figuras, áreas y creatividad. Incluye soporte pedagógico con figuras para armar.',
    descripcionCorta: 'Tangram clásico 7 piezas con marco',
    categoria: 'tangram',
    imagen: '/productos/tangram-cuadrado.jpg',
    precio: 10000,
    precioMayorista: 8000,
    coloresPersonalizables: true,
    logoInstitucional: true,
    destacado: true,
    activo: true,
  },
  {
    id: '2',
    slug: 'tangram-triangulo',
    nombre: 'Tangram Triángulo',
    descripcion: 'Variante triangular del tangram con piezas que encajan en un marco triangular. Agrega un nivel de desafío diferente al clásico. Incluye soporte pedagógico.',
    descripcionCorta: 'Tangram en formato triángulo con marco',
    categoria: 'tangram',
    imagen: '/productos/tangram-triangulo.jpg',
    precio: 7000,
    precioMayorista: 5000,
    coloresPersonalizables: true,
    logoInstitucional: true,
    destacado: false,
    activo: true,
  },
  {
    id: '3',
    slug: 'tangram-corazon',
    nombre: 'Tangram Corazón',
    descripcion: 'Tangram con forma de corazón. Perfecto para actividades especiales, efemérides y como regalo institucional. Incluye soporte pedagógico con figuras para armar.',
    descripcionCorta: 'Tangram en forma de corazón',
    categoria: 'tangram',
    imagen: '/productos/tangram-corazon.jpg',
    precio: 8500,
    precioMayorista: 7000,
    coloresPersonalizables: true,
    logoInstitucional: true,
    destacado: true,
    activo: true,
  },
  {
    id: '4',
    slug: 'tangram-huevo',
    nombre: 'Tangram Huevo',
    descripcion: 'Tangram con forma oval/huevo. Una variante original que permite armar figuras diferentes a las del tangram clásico. Incluye soporte pedagógico.',
    descripcionCorta: 'Tangram en forma de huevo/óvalo',
    categoria: 'tangram',
    imagen: '/productos/tangram-huevo.jpg',
    precio: 8500,
    precioMayorista: 7000,
    coloresPersonalizables: true,
    logoInstitucional: true,
    destacado: false,
    activo: true,
  },
  {
    id: '5',
    slug: 'tangram-circular',
    nombre: 'Tangram Circular',
    descripcion: 'Tangram circular con base cuadrada. Las piezas forman un círculo completo, trabajando conceptos de fracciones y geometría circular. Incluye soporte pedagógico.',
    descripcionCorta: 'Tangram circular con base cuadrada',
    categoria: 'tangram',
    imagen: '/productos/tangram-circular.jpg',
    precio: 8500,
    precioMayorista: 7500,
    coloresPersonalizables: true,
    logoInstitucional: true,
    destacado: false,
    activo: true,
  },
  {
    id: '6',
    slug: 'desafio-hexagonal',
    nombre: 'Desafío Hexagonal',
    descripcion: 'Rompecabezas de piezas hexagonales en estuche tipo valija. Desafío de lógica y paciencia con piezas que encajan en un tablero hexagonal. Ideal para desarrollo del pensamiento estratégico.',
    descripcionCorta: 'Puzzle hexagonal en estuche',
    categoria: 'puzzle',
    imagen: '/productos/desafio-hexagonal.jpg',
    precio: 16000,
    precioMayorista: 10900,
    coloresPersonalizables: true,
    logoInstitucional: true,
    destacado: true,
    activo: true,
  },
  {
    id: '7',
    slug: 'mini-hexagonal',
    nombre: 'Mini Hexagonal',
    descripcion: 'Versión compacta del desafío hexagonal. Piezas hexagonales que se acomodan en una base hexagonal. Portable y perfecto para el aula.',
    descripcionCorta: 'Puzzle hexagonal compacto',
    categoria: 'puzzle',
    imagen: '/productos/mini-hexagonal.jpg',
    precio: 7500,
    precioMayorista: 6000,
    coloresPersonalizables: true,
    logoInstitucional: true,
    destacado: false,
    activo: true,
  },
  {
    id: '8',
    slug: 'pizza-puzzle',
    nombre: 'Pizza Puzzle',
    descripcion: 'Rompecabezas con forma de pizza. Las porciones se desarman y hay que volver a armarlas con los toppings correctos. Trabaja fracciones de forma lúdica y divertida.',
    descripcionCorta: 'Puzzle de pizza con fracciones',
    categoria: 'puzzle',
    imagen: '/productos/pizza-puzzle.jpg',
    precio: 9000,
    precioMayorista: 7500,
    coloresPersonalizables: true,
    logoInstitucional: true,
    destacado: true,
    activo: true,
  },
  {
    id: '9',
    slug: 'rompecabezas-geometrico',
    nombre: 'Rompecabezas Geométrico',
    descripcion: 'Puzzle de piezas geométricas tipo tetris que se acomodan en un tablero cuadrado con marco. Trabaja razonamiento espacial, lógica y paciencia.',
    descripcionCorta: 'Puzzle geométrico tipo tetris',
    categoria: 'puzzle',
    imagen: '/productos/rompecabezas-geometrico.jpg',
    precio: 7500,
    precioMayorista: 6000,
    coloresPersonalizables: true,
    logoInstitucional: true,
    destacado: false,
    activo: true,
  },
  {
    id: '10',
    slug: 'regla-lectura',
    nombre: 'Reglas de Lectura',
    descripcion: 'Regla con ventana recortada que enmarca una línea de texto a la vez. Herramienta de apoyo para lectores en proceso de aprendizaje, lectura inclusiva y dificultades de seguimiento visual. Colores a elección.',
    descripcionCorta: 'Regla con ventana para guiar la lectura',
    categoria: 'lectura',
    imagen: '/productos/regla-lectura.jpg',
    precio: 4000,
    precioMayorista: 4000,
    coloresPersonalizables: true,
    logoInstitucional: true,
    destacado: false,
    activo: true,
  },
  {
    id: '11',
    slug: 'celula-animal-vegetal',
    nombre: 'Célula Animal y Vegetal',
    descripcion: 'Modelos didácticos de célula vegetal y célula animal con organelas diferenciadas por color y por relieve. Permiten trabajar biología celular de forma manipulativa. Se venden por separado o como set de las dos.',
    descripcionCorta: 'Cada una $20.000 — Set vegetal + animal $35.000',
    categoria: 'biologia',
    imagen: '/productos/celulas-biologia.jpg',
    precio: 20000,
    precioMayorista: 20000,
    coloresPersonalizables: false,
    logoInstitucional: false,
    destacado: true,
    activo: true,
  },
  {
    id: '12',
    slug: 'set-fracciones',
    nombre: 'Set Fracciones',
    descripcion: 'Tablero pedagógico con piezas circulares fraccionadas en mitades, tercios, cuartos, quintos, sextos, séptimos y octavos. Cada fracción en un color y con su número grabado. Permite trabajar fracciones equivalentes, comparación y operaciones de forma manipulativa.',
    descripcionCorta: 'Tablero de fracciones de 1/2 a 1/8',
    categoria: 'geometria',
    imagen: '/productos/set-fracciones.jpg',
    precio: 17000,
    precioMayorista: 12900,
    coloresPersonalizables: false,
    logoInstitucional: true,
    destacado: true,
    activo: true,
  },
]

export function getProductoBySlug(slug: string): Producto | undefined {
  return productos.find(p => p.slug === slug)
}

export function getProductosDestacados(): Producto[] {
  return productos.filter(p => p.destacado && p.activo)
}

export function getProductosPorCategoria(categoria: Producto['categoria']): Producto[] {
  return productos.filter(p => p.categoria === categoria && p.activo)
}

// Formatear precio argentino
export function formatPrecio(precio: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(precio)
}
