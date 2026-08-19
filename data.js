// Catálogo. Cada producto tiene variantes (colores/unidades).
// "reserved" en una variante = ya tiene una cruz marcada.
// El sello "SIN STOCK" se calcula solo cuando TODAS las variantes de un producto están reservadas.
const SEED_PRODUCTS = [
  {
    id: "vaso-900ml",
    title: "Vaso Térmico Doble Pico 900ML",
    desc: "Con manija y diseños estampados, incluye sorbete.",
    price: 25000,
    category: "Vasos",
    kit: false,
    img: "images/vaso-doble-pico-900ml.jpg",
    variants: [
      { id: "v1", label: "Crema", reserved: false },
      { id: "v2", label: "Celeste", reserved: false },
      { id: "v3", label: "Amarillo", reserved: false },
      { id: "v4", label: "Lila", reserved: false },
      { id: "v5", label: "Rosa", reserved: false },
      { id: "v6", label: "Turquesa", reserved: false }
    ]
  },
  {
    id: "botella-500-siliconada",
    title: "Botella Térmica 500ML Doble Tapa Pico Siliconada",
    desc: "Diseño de animalitos con correa colgante.",
    price: 25000,
    category: "Termos",
    kit: false,
    img: "images/botella-500ml-siliconada.jpg",
    variants: [
      { id: "v1", label: "Rosa", reserved: false },
      { id: "v2", label: "Celeste", reserved: false },
      { id: "v3", label: "Lila", reserved: false },
      { id: "v4", label: "Verde", reserved: false }
    ]
  },
  {
    id: "botella-500-dibujos",
    title: "Botella Térmica Doble Tapa 500ML con Dibujos",
    desc: "Con manija plegable, diseños infantiles.",
    price: 27000,
    category: "Termos",
    kit: false,
    img: "images/botella-500ml-dibujos.jpg",
    variants: [
      { id: "v1", label: "Amarillo", reserved: false },
      { id: "v2", label: "Lila", reserved: false },
      { id: "v3", label: "Blanco", reserved: false },
      { id: "v4", label: "Rosa", reserved: false }
    ]
  },
  {
    id: "botella-800ml",
    title: "Botella Térmica 800ML",
    desc: "Doble pared, mantiene frío y calor.",
    price: 25000,
    category: "Termos",
    kit: false,
    img: "images/botella-800ml.jpg",
    variants: [
      { id: "v1", label: "Blanco", reserved: false },
      { id: "v2", label: "Celeste", reserved: false },
      { id: "v3", label: "Rosa", reserved: false },
      { id: "v4", label: "Verde militar", reserved: false },
      { id: "v5", label: "Rojo", reserved: false },
      { id: "v6", label: "Negro", reserved: false }
    ]
  },
  {
    id: "termo-deportivo-750",
    title: "Termo Deportivo con Pico 750ML",
    desc: "Pico deportivo con traba, ideal para gimnasio.",
    price: 25000,
    category: "Termos",
    kit: false,
    img: "images/termo-deportivo-750ml.jpg",
    variants: [
      { id: "v1", label: "Blanco", reserved: false },
      { id: "v2", label: "Lila", reserved: false },
      { id: "v3", label: "Amarillo", reserved: false },
      { id: "v4", label: "Negro", reserved: false },
      { id: "v5", label: "Celeste", reserved: false },
      { id: "v6", label: "Rojo", reserved: false },
      { id: "v7", label: "Rosa", reserved: false }
    ]
  },
  {
    id: "termo-460-silicona",
    title: "Termo 460ML Doble Tapa Pico Silicona",
    desc: "Con correa cruzada, varios colores.",
    price: 25500,
    category: "Termos",
    kit: false,
    img: "images/termo-460ml-silicona.jpg",
    variants: [
      { id: "v1", label: "Crema", reserved: false },
      { id: "v2", label: "Celeste", reserved: false },
      { id: "v3", label: "Azul", reserved: false },
      { id: "v4", label: "Rosa", reserved: false }
    ]
  },
  {
    id: "termo-500-funda",
    title: "Termo 500ML con Funda",
    desc: "Trillium acero quirúrgico, mantiene bebidas hasta 72hs. Incluye cuchara y funda.",
    price: 28000,
    category: "Termos",
    kit: true,
    img: "images/termo-500ml-funda.jpg",
    variants: [{ id: "u1", label: "Acero", reserved: false }]
  },
  {
    id: "termo-infantil-600",
    title: "Termo Infantil Pico Silicona 600ML",
    desc: "Diseño conejito con correa y stickers decorativos.",
    price: 25500,
    category: "Infantil",
    kit: false,
    img: "images/termo-infantil-600ml.jpg",
    variants: [
      { id: "v1", label: "Rosa", reserved: false },
      { id: "v2", label: "Crema", reserved: false },
      { id: "v3", label: "Lila", reserved: false },
      { id: "v4", label: "Verde", reserved: false }
    ]
  },
  {
    id: "termo-infantil-500-osito",
    title: "Termo Infantil Pico Silicona 500ML",
    desc: "Diseño osito con orejas y correa cruzada.",
    price: 23500,
    category: "Infantil",
    kit: false,
    img: "images/termo-infantil-500ml-osito.jpg",
    variants: [
      { id: "v1", label: "Rosa", reserved: false },
      { id: "v2", label: "Celeste", reserved: false },
      { id: "v3", label: "Turquesa", reserved: false },
      { id: "v4", label: "Lila", reserved: false }
    ]
  },
  {
    id: "termo-infantil-disney",
    title: "Termo Infantil Disney Original 460ML",
    desc: "Con muñeco de personaje en la tapa, correa incluida.",
    price: 33000,
    category: "Infantil",
    kit: false,
    img: "images/termo-infantil-disney.jpg",
    variants: [
      { id: "v1", label: "Blanco/lila", reserved: false },
      { id: "v2", label: "Verde", reserved: false }
    ]
  },
  {
    id: "termo-infantil-cutebaby",
    title: "Termo Infantil con Pico Silicona 500ML",
    desc: "Línea Cute Baby, con correa y hebilla.",
    price: 25000,
    category: "Infantil",
    kit: false,
    img: "images/termo-infantil-cutebaby.jpg",
    variants: [
      { id: "v1", label: "Negro", reserved: false },
      { id: "v2", label: "Celeste", reserved: false },
      { id: "v3", label: "Blanco", reserved: false },
      { id: "v4", label: "Rosa", reserved: false },
      { id: "v5", label: "Acero/rosa", reserved: false }
    ]
  },
  {
    id: "quencher-verde-rosa-v2",
    title: "Quencher 1.2 Litros con Sorbete de Plástico",
    desc: "Vaso térmico con manija y sorbete.",
    price: 25000,
    category: "Vasos",
    kit: false,
    img: "images/quencher-verde-rosa-v2.jpg",
    variants: [
      { id: "v1", label: "Verde militar", reserved: false },
      { id: "v2", label: "Rosa fucsia", reserved: false }
    ]
  },
  {
    id: "termo13-corazones-v2",
    title: "Termo 1.3L (la tapa se usa como mate) + bombilla",
    desc: "Incluye bombilla, viene en caja.",
    price: 33000,
    category: "Termos",
    kit: false,
    img: "images/termo13-corazones-v2.jpg",
    variants: [
      { id: "v1", label: "Blanco multicolor", reserved: false },
      { id: "v2", label: "Blanco corazones", reserved: false },
      { id: "v3", label: "Negro estrellado", reserved: false }
    ]
  },
  {
    id: "termo13-floral-v2",
    title: "Termo 1.3L (la tapa se usa como mate) + bombilla",
    desc: "Incluye bombilla, viene en caja.",
    price: 33000,
    category: "Termos",
    kit: false,
    img: "images/termo13-floral-v2.jpg",
    variants: [
      { id: "v1", label: "Rosa floral", reserved: false },
      { id: "v2", label: "Celeste jaspeado", reserved: false },
      { id: "v3", label: "Rosa corazones", reserved: false }
    ]
  },
  {
    id: "termo13-variado-v2",
    title: "Termo 1.3L (la tapa se usa como mate) + bombilla",
    desc: "Incluye bombilla, viene en caja. Gran variedad de colores.",
    price: 33000,
    category: "Termos",
    kit: false,
    img: "images/termo13-variado-v2.jpg",
    variants: [
      { id: "v1", label: "Negro", reserved: false },
      { id: "v2", label: "Blanco corazones", reserved: false },
      { id: "v3", label: "Negro estrellado", reserved: false },
      { id: "v4", label: "Blanco", reserved: false },
      { id: "v5", label: "Gris", reserved: false },
      { id: "v6", label: "Celeste", reserved: false },
      { id: "v7", label: "Rosa floral", reserved: false },
      { id: "v8", label: "Blanco multicolor", reserved: false },
      { id: "v9", label: "Rosa corazones", reserved: false }
    ]
  },
  {
    id: "estufa-winco-v2",
    title: "Estufa Halógena Winco W122 Quarzo",
    desc: "Dos niveles de potencia, corte automático por caída, industria argentina.",
    price: 35000,
    category: "Hogar",
    kit: false,
    img: "images/estufa-winco-v2.jpg",
    variants: [{ id: "u1", label: "Único", reserved: false }]
  },
  {
    id: "termo13-floral-v3",
    title: "Termo 1.3L (la tapa se usa como mate) + bombilla",
    desc: "Incluye bombilla, viene en caja.",
    price: 33000,
    category: "Termos",
    kit: false,
    img: "images/termo13-floral-v3.jpg",
    variants: [
      { id: "v1", label: "Lila floral", reserved: false },
      { id: "v2", label: "Celeste floral", reserved: false },
      { id: "v3", label: "Blanco corazones", reserved: false }
    ]
  },
  {
    id: "convector-oryx-v2",
    title: "Convector Eléctrico ORYX DL2000",
    desc: "Termostato regulable, convección turbo, diseño silencioso.",
    price: 60000,
    category: "Hogar",
    kit: false,
    img: "images/convector-oryx-v2.jpg",
    variants: [{ id: "u1", label: "Único", reserved: false }]
  },
  {
    id: "mopas-colores-v2",
    title: "Mopas de Colores",
    desc: "Balde de 13L, 2 mopas, palo 1.45m, cabezal de acero con tapón, dispenser, rueditas.",
    price: 25000,
    category: "Limpieza",
    kit: true,
    img: "images/mopas-colores-v2.jpg",
    variants: [
      { id: "v1", label: "Celeste", reserved: false },
      { id: "v2", label: "Verde", reserved: false },
      { id: "v3", label: "Violeta", reserved: false },
      { id: "v4", label: "Rojo", reserved: false },
      { id: "v5", label: "Negro", reserved: false }
    ]
  },
  {
    id: "yerbera-azucarera-v2",
    title: "Yerbera y Azucarera Stanley",
    desc: "Diseño floral celeste, set de dos tamaños.",
    price: 12000,
    category: "Accesorios",
    kit: true,
    img: "images/yerbera-azucarera-v2.jpg",
    variants: [{ id: "v1", label: "Floral celeste", reserved: false }]
  }
];
