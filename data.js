// Catálogo inicial. Cada producto tiene variantes (colores/unidades).
// "reserved" en una variante = ya tiene una cruz marcada.
// El sello "SIN STOCK" se calcula solo cuando TODAS las variantes de un producto están reservadas.
const SEED_PRODUCTS = [
  {
    id: "convector-oryx",
    title: "Convector Eléctrico ORYX DL2000",
    desc: "Termostato regulable, convección turbo, diseño silencioso.",
    price: 60000,
    category: "Hogar",
    kit: false,
    img: "images/convector-oryx.jpg",
    variants: [{ id: "u1", label: "Único", reserved: false }]
  },
  {
    id: "termo13-floral-a",
    title: "Termo 1.3L (la tapa se usa como mate) + bombilla",
    desc: "Incluye bombilla, viene en caja.",
    price: 33000,
    category: "Termos",
    kit: false,
    img: "images/termo13-floral-a.jpg",
    variants: [
      { id: "v1", label: "Rosa a rayas florales", reserved: false },
      { id: "v2", label: "Celeste jaspeado", reserved: false },
      { id: "v3", label: "Rosa flores silvestres", reserved: false }
    ]
  },
  {
    id: "quencher-verde-rosa",
    title: "Quencher 1.2L con sorbete de plástico",
    desc: "Vaso térmico Stanley con manija y sorbete.",
    price: 25000,
    category: "Vasos",
    kit: false,
    img: "images/quencher-verde-rosa.jpg",
    variants: [
      { id: "v1", label: "Verde militar", reserved: false },
      { id: "v2", label: "Rosa fucsia", reserved: false }
    ]
  },
  {
    id: "termo13-corazones",
    title: "Termo 1.3L (la tapa se usa como mate) + bombilla",
    desc: "Incluye bombilla, viene en caja.",
    price: 33000,
    category: "Termos",
    kit: false,
    img: "images/termo13-corazones.jpg",
    variants: [
      { id: "v1", label: "Blanco multicolor", reserved: false },
      { id: "v2", label: "Blanco corazones", reserved: false },
      { id: "v3", label: "Negro estrellado", reserved: false }
    ]
  },
  {
    id: "termo13-floral-b",
    title: "Termo 1.3L (la tapa se usa como mate) + bombilla",
    desc: "Incluye bombilla, viene en caja.",
    price: 33000,
    category: "Termos",
    kit: false,
    img: "images/termo13-floral-b.jpg",
    variants: [
      { id: "v1", label: "Lila floral", reserved: false },
      { id: "v2", label: "Celeste floral", reserved: false },
      { id: "v3", label: "Blanco corazones rojos", reserved: false }
    ]
  },
  {
    id: "termo13-variado",
    title: "Termo 1.3L (la tapa se usa como mate) + bombilla",
    desc: "Incluye bombilla, viene en caja. Gran variedad de colores.",
    price: 33000,
    category: "Termos",
    kit: false,
    img: "images/termo13-variado.jpg",
    variants: [
      { id: "v1", label: "Negro", reserved: false },
      { id: "v2", label: "Blanco corazones", reserved: false },
      { id: "v3", label: "Negro estrellado", reserved: false },
      { id: "v4", label: "Blanco", reserved: false },
      { id: "v5", label: "Gris", reserved: false },
      { id: "v6", label: "Celeste", reserved: false },
      { id: "v7", label: "Lila floral", reserved: false },
      { id: "v8", label: "Durazno floral", reserved: false },
      { id: "v9", label: "Blanco corazones rosas", reserved: false },
      { id: "v10", label: "Blanco multicolor", reserved: false },
      { id: "v11", label: "Rosa floral", reserved: false },
      { id: "v12", label: "Mini bolita blanca", reserved: false },
      { id: "v13", label: "Mini bolita rosa", reserved: false }
    ]
  },
  {
    id: "estufa-winco",
    title: "Estufa Halógena Winco W122 Quarzo",
    desc: "Dos niveles de potencia, corte automático por caída, industria argentina.",
    price: 35000,
    category: "Hogar",
    kit: false,
    img: "images/estufa-winco.jpg",
    variants: [{ id: "u1", label: "Único", reserved: false }]
  },
  {
    id: "termo-independiente",
    title: "Set Termo 1L Independiente (C.A.I.) completo",
    desc: "Termo + mate + 2 latas (yerbera y azucarera).",
    price: 33000,
    category: "Kits",
    kit: true,
    img: "images/termo-independiente.jpg",
    variants: [{ id: "u1", label: "Set completo", reserved: false }]
  },
  {
    id: "set-stanley-celeste",
    title: "Set Completo Stanley 1L (tapa se usa como mate)",
    desc: "Con yerbera, azucarera y bombilla.",
    price: 40000,
    category: "Kits",
    kit: true,
    img: "images/set-stanley-celeste.jpg",
    variants: [{ id: "v1", label: "Celeste - set completo", reserved: false }]
  },
  {
    id: "yerbera-azucarera-floral",
    title: "Yerbera y Azucarera Stanley",
    desc: "Diseño floral celeste.",
    price: 12000,
    category: "Accesorios",
    kit: true,
    img: "images/yerbera-azucarera-floral.jpg",
    variants: [{ id: "v1", label: "Floral celeste", reserved: false }]
  },
  {
    id: "mopas-colores",
    title: "Mopas de Colores",
    desc: "Balde de 13L, 2 mopas, palo 1.45m, cabezal de acero con tapón, dispenser, rueditas.",
    price: 25000,
    category: "Limpieza",
    kit: true,
    img: "images/mopas-colores.jpg",
    variants: [
      { id: "v1", label: "Celeste", reserved: false },
      { id: "v2", label: "Verde", reserved: false },
      { id: "v3", label: "Violeta", reserved: false },
      { id: "v4", label: "Rojo", reserved: false },
      { id: "v5", label: "Negro", reserved: false }
    ]
  },
  {
    id: "set-media-manija-rojo",
    title: "Set Media Manija Rojo 1L Stanley",
    desc: "Set completo color rojo.",
    price: 35000,
    category: "Kits",
    kit: true,
    img: "images/set-media-manija-rojo.jpg",
    variants: [{ id: "v1", label: "Rojo - set completo", reserved: false }]
  },
  {
    id: "set-stanley-marron",
    title: "Set Completo Stanley 1L",
    desc: "Set completo color marrón/cobre.",
    price: 37500,
    category: "Kits",
    kit: true,
    img: "images/set-stanley-marron.jpg",
    variants: [{ id: "v1", label: "Marrón cobre - set completo", reserved: false }]
  },
  {
    id: "set-stanley-negro-1",
    title: "Set Completo Stanley 1L",
    desc: "Set completo color negro.",
    price: 37500,
    category: "Kits",
    kit: true,
    img: "images/set-stanley-negro-1.jpg",
    variants: [{ id: "v1", label: "Negro - set completo", reserved: false }]
  },
  {
    id: "termo-futbol",
    title: "Termo 1L Equipos de Fútbol",
    desc: "Licencia de clubes argentinos.",
    price: 30000,
    category: "Termos",
    kit: false,
    img: "images/termo-futbol.jpg",
    variants: [
      { id: "v1", label: "Racing", reserved: false },
      { id: "v2", label: "Boca Juniors", reserved: false },
      { id: "v3", label: "River Plate", reserved: false },
      { id: "v4", label: "Independiente", reserved: false }
    ]
  },
  {
    id: "quencher-16",
    title: "Quencher 1.2L con sorbete de plástico",
    desc: "Vaso térmico Stanley con manija y sorbete.",
    price: 25000,
    category: "Vasos",
    kit: false,
    img: "images/quencher-16.jpg",
    variants: [
      { id: "v1", label: "Naranja", reserved: false },
      { id: "v2", label: "Verde oliva", reserved: false },
      { id: "v3", label: "Negro", reserved: true },
      { id: "v4", label: "Blanco", reserved: false }
    ]
  },
  {
    id: "set-stanley-negro-2",
    title: "Set Completo Stanley 1L",
    desc: "Set completo color negro.",
    price: 33000,
    category: "Kits",
    kit: true,
    img: "images/set-stanley-negro-2.jpg",
    variants: [{ id: "v1", label: "Negro - set completo", reserved: false }]
  },
  {
    id: "termos-stanley-colores",
    title: "Termos Stanley 1L",
    desc: "Aislados al vacío, sirven para agua fría y caliente.",
    price: 30000,
    category: "Termos",
    kit: false,
    img: "images/termos-stanley-colores.jpg",
    variants: [
      { id: "v1", label: "Azul", reserved: false },
      { id: "v2", label: "Rojo", reserved: false },
      { id: "v3", label: "Negro", reserved: false },
      { id: "v4", label: "Violeta", reserved: false }
    ]
  },
  {
    id: "quencher-19",
    title: "Quencher 1.2L con sorbete de plástico",
    desc: "Vaso térmico Stanley con manija y sorbete.",
    price: 25000,
    category: "Vasos",
    kit: false,
    img: "images/quencher-19.jpg",
    variants: [
      { id: "v1", label: "Rosa", reserved: false },
      { id: "v2", label: "Lila", reserved: true },
      { id: "v3", label: "Azul marino", reserved: true }
    ]
  }
];
