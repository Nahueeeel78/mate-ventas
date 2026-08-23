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
  },
  {
    id: "cucharas-madera-colores",
    title: "Set de Cucharas Medidoras de Silicona",
    desc: "Mango de madera, 4 tamaños con broches magnéticos.",
    price: 5000,
    category: "Cocina",
    kit: true,
    img: "images/cucharas-madera-colores.jpg",
    variants: [{ id: "u1", label: "Rosa/Verde/Celeste/Lila", reserved: false }]
  },
  {
    id: "brochas-maquillaje-holografico",
    title: "Set de Brochas de Maquillaje Holográficas",
    desc: "Cabo de cristal con glitter, estuche transparente.",
    price: 3500,
    category: "Belleza",
    kit: true,
    img: "images/brochas-maquillaje-holografico.jpg",
    variants: [
      { id: "v1", label: "Rosa", reserved: false },
      { id: "v2", label: "Violeta", reserved: false }
    ]
  },
  {
    id: "brochas-maquillaje-set-bolsas",
    title: "Set de Brochas de Maquillaje",
    desc: "Cada set viene en su propia bolsa individual.",
    price: 3500,
    category: "Belleza",
    kit: true,
    img: "images/brochas-maquillaje-set-bolsas.jpg",
    variants: [{ id: "u1", label: "Set x unidad", reserved: false }]
  },
  {
    id: "termo-stanley-12l-6colores",
    title: "Termo Stanley 1.2 Litro",
    desc: "Pico cebador, aislado al vacío.",
    price: 33000,
    category: "Termos",
    kit: false,
    img: "images/termo-stanley-12l-6colores.jpg",
    variants: [
      { id: "v1", label: "Negro", reserved: false },
      { id: "v2", label: "Rojo", reserved: false },
      { id: "v3", label: "Lila", reserved: false },
      { id: "v4", label: "Verde", reserved: false },
      { id: "v5", label: "Durazno", reserved: false },
      { id: "v6", label: "Azul", reserved: false }
    ]
  },
  {
    id: "set-utensilios-12pzs-colores",
    title: "Set de Utensilios de Cocina 12 Piezas",
    desc: "Mango de madera y silicona, incluye organizador. Pinzas, servidor de spagueti, batidor, espátula ranurada, brocha, raspador, volteador, cucharón, espátula, cuchara, cuchara ranurada.",
    price: 28500,
    category: "Cocina",
    kit: true,
    img: "images/set-utensilios-12pzs-colores.jpg",
    variants: [
      { id: "v1", label: "Negro", reserved: false },
      { id: "v2", label: "Crema", reserved: false },
      { id: "v3", label: "Beige", reserved: false },
      { id: "v4", label: "Verde menta", reserved: false },
      { id: "v5", label: "Rojo", reserved: false },
      { id: "v6", label: "Rosa", reserved: false },
      { id: "v7", label: "Violeta", reserved: false }
    ]
  },
  {
    id: "set-stanley-negro-1l-detalle",
    title: "Set Completo Stanley 1 Litro",
    desc: "Termo + mate + yerbera + azucarera.",
    price: 35500,
    category: "Kits",
    kit: true,
    img: "images/set-stanley-negro-1l-detalle.jpg",
    variants: [{ id: "v1", label: "Negro - set completo", reserved: false }]
  },
  {
    id: "quencher-marron-turquesa-verde",
    title: "Quencher Stanley 1.2 Litros",
    desc: "Con manija y sorbete de plástico.",
    price: 25000,
    category: "Vasos",
    kit: false,
    img: "images/quencher-marron-turquesa-verde.jpg",
    variants: [
      { id: "v1", label: "Marrón", reserved: false },
      { id: "v2", label: "Turquesa", reserved: false },
      { id: "v3", label: "Verde militar", reserved: false }
    ]
  },
  {
    id: "mate-260ml-terere",
    title: "Mate Stanley 260ML (sirve para tereré)",
    desc: "Aislado al vacío.",
    price: 14000,
    category: "Accesorios",
    kit: false,
    img: "images/mate-260ml-terere.jpg",
    variants: [
      { id: "v1", label: "Rojo", reserved: false },
      { id: "v2", label: "Blanco", reserved: false },
      { id: "v3", label: "Fucsia", reserved: false },
      { id: "v4", label: "Negro", reserved: false }
    ]
  },
  {
    id: "mate-vasito-3colores",
    title: "Mate Stanley Tipo Vasito",
    desc: "Aislado al vacío.",
    price: 13500,
    category: "Accesorios",
    kit: false,
    img: "images/mate-vasito-3colores.jpg",
    variants: [
      { id: "v1", label: "Fucsia", reserved: false },
      { id: "v2", label: "Lila", reserved: false },
      { id: "v3", label: "Beige", reserved: false }
    ]
  },
  {
    id: "termo-stanley-12l-6colores-b",
    title: "Termo Stanley 1.2 Litro",
    desc: "Pico cebador, aislado al vacío.",
    price: 30500,
    category: "Termos",
    kit: false,
    img: "images/termo-stanley-12l-6colores-b.jpg",
    variants: [
      { id: "v1", label: "Blanco", reserved: false },
      { id: "v2", label: "Rojo", reserved: false },
      { id: "v3", label: "Azul", reserved: false },
      { id: "v4", label: "Negro", reserved: false },
      { id: "v5", label: "Rosa", reserved: false },
      { id: "v6", label: "Verde", reserved: false }
    ]
  },
  {
    id: "set-stanley-rosa-floral-13l",
    title: "Set Completo Stanley 1.3 Litro",
    desc: "Termo + yerbera + azucarera, diseño floral.",
    price: 37500,
    category: "Kits",
    kit: true,
    img: "images/set-stanley-rosa-floral-13l.jpg",
    variants: [{ id: "v1", label: "Rosa floral - set completo", reserved: false }]
  },
  {
    id: "set-stanley-blanco-floral-13l",
    title: "Set Completo Stanley 1.3 Litro",
    desc: "Termo + yerbera + azucarera, diseño floral.",
    price: 36500,
    category: "Kits",
    kit: true,
    img: "images/set-stanley-blanco-floral-13l.jpg",
    variants: [{ id: "v1", label: "Blanco floral - set completo", reserved: false }]
  },
  {
    id: "set-stanley-gris-1l",
    title: "Set Completo Stanley 1 Litro",
    desc: "Termo + mate + yerbera + azucarera.",
    price: 37500,
    category: "Kits",
    kit: true,
    img: "images/set-stanley-gris-1l.jpg",
    variants: [{ id: "v1", label: "Gris - set completo", reserved: false }]
  },
  {
    id: "set-stanley-verde-1l",
    title: "Set Completo Stanley 1 Litro",
    desc: "Termo (tapa se usa como mate) con yerbera, azucarera y bombilla.",
    price: 40000,
    category: "Kits",
    kit: true,
    img: "images/set-stanley-verde-1l.jpg",
    variants: [{ id: "v1", label: "Verde - set completo", reserved: false }]
  },
  {
    id: "set-stanley-lila-1l",
    title: "Set Completo Stanley 1 Litro",
    desc: "Termo + mate + yerbera + azucarera.",
    price: 37500,
    category: "Kits",
    kit: true,
    img: "images/set-stanley-lila-1l.jpg",
    variants: [{ id: "v1", label: "Lila - set completo", reserved: false }]
  },
  {
    id: "tapers-verde-jarra",
    title: "Set 5 Tapers + Jarra con Tapa",
    desc: "Bowls con tapa hermética de distintos tamaños más jarra con tapa.",
    price: 21500,
    category: "Cocina",
    kit: true,
    img: "images/tapers-verde-jarra.jpg",
    variants: [{ id: "v1", label: "Verde", reserved: false }]
  },
  {
    id: "canasto-mate-cuero",
    title: "Canasto de Mate de Cuero",
    desc: "Doble compartimento con manija, terminación cosida.",
    price: 25000,
    category: "Accesorios",
    kit: false,
    img: "images/canasto-mate-cuero.jpg",
    variants: [{ id: "u1", label: "Negro", reserved: false }]
  },
  {
    id: "quencher-clubes-futbol",
    title: "Quencher 1.2L con Sorbete de Silicona - Clubes de Fútbol",
    desc: "Con manija y escudo del club.",
    price: 25000,
    category: "Vasos",
    kit: false,
    img: "images/quencher-clubes-futbol.jpg",
    variants: [
      { id: "v1", label: "San Lorenzo", reserved: false },
      { id: "v2", label: "Racing", reserved: false },
      { id: "v3", label: "Selección Argentina", reserved: false },
      { id: "v4", label: "River Plate", reserved: false },
      { id: "v5", label: "Boca Juniors", reserved: false }
    ]
  },
  {
    id: "set-completo-1l-rosa-32",
    title: "Set Completo Stanley 1 Litro",
    desc: "Termo + mate + 2 latas.",
    price: 32000,
    category: "Kits",
    kit: true,
    img: "images/set-completo-1l-rosa-32.jpg",
    variants: [{ id: "v1", label: "Rosa - set completo", reserved: false }]
  },
  {
    id: "set-completo-bolso-12l",
    title: "Set Completo Stanley 1.2L con Bolso",
    desc: "Termo + mate + 2 latas + bolso de transporte.",
    price: 45000,
    category: "Kits",
    kit: true,
    img: "images/set-completo-bolso-12l.jpg",
    variants: [{ id: "v1", label: "Rosa - set completo", reserved: false }]
  },
  {
    id: "set-completo-12l-37blanco",
    title: "Set Completo Stanley 1.2 Litro",
    desc: "Termo + mate + 2 latas.",
    price: 37000,
    category: "Kits",
    kit: true,
    img: "images/set-completo-12l-37blanco.jpg",
    variants: [
      { id: "v1", label: "Blanco", reserved: false },
      { id: "v2", label: "Azul", reserved: false },
      { id: "v3", label: "Rojo", reserved: false },
      { id: "v4", label: "Negro", reserved: false }
    ]
  },
  {
    id: "tender-simple",
    title: "Tender Simple - Secador de Ropa Plegable",
    desc: "Metálico, pintado con pintura epoxi. Largo 105cm, ancho 84cm, altura 85cm (cerrado 44cm). Ocho varillas metálicas, capacidad 6.4m.",
    price: 30000,
    category: "Hogar",
    kit: false,
    img: "images/tender-simple.jpg",
    variants: [{ id: "u1", label: "Único", reserved: false }]
  },
  {
    id: "botella-acero-500ml-colores",
    title: "Botella de Acero 500ML",
    desc: "Botella térmica delgada.",
    price: 25000,
    category: "Termos",
    kit: false,
    img: "images/botella-acero-500ml-colores.jpg",
    variants: [
      { id: "v1", label: "Violeta", reserved: false },
      { id: "v2", label: "Blanco", reserved: false },
      { id: "v3", label: "Negro", reserved: false },
      { id: "v4", label: "Rosa", reserved: false }
    ]
  },
  {
    id: "termo-1l-4colores",
    title: "Termo Stanley 1 Litro",
    desc: "Aislado al vacío.",
    price: 35000,
    category: "Termos",
    kit: false,
    img: "images/termo-1l-4colores.jpg",
    variants: [
      { id: "v1", label: "Verde", reserved: false },
      { id: "v2", label: "Blanco", reserved: false },
      { id: "v3", label: "Cobre", reserved: false },
      { id: "v4", label: "Negro", reserved: false }
    ]
  },
  {
    id: "termo-12l-escudos",
    title: "Termo Stanley 1.2L con Escudos",
    desc: "Acero inoxidable.",
    price: 30000,
    category: "Termos",
    kit: false,
    img: "images/termo-12l-escudos.jpg",
    variants: [{ id: "u1", label: "Acero", reserved: false }]
  },
  {
    id: "set-completo-355-rosa",
    title: "Set Completo Stanley",
    desc: "Termo + mate + 2 latas.",
    price: 35500,
    category: "Kits",
    kit: true,
    img: "images/set-completo-355-rosa.jpg",
    variants: [{ id: "v1", label: "Rosa - set completo", reserved: false }]
  },
  {
    id: "set-completo-canasto-mate",
    title: "Set Completo Stanley con Canasto de Mate",
    desc: "Termo + mate + 2 latas + canasto de cuero para transportar.",
    price: 42000,
    category: "Kits",
    kit: true,
    img: "images/set-completo-canasto-mate.jpg",
    variants: [{ id: "v1", label: "Rosa - set completo", reserved: false }]
  },
  {
    id: "vaso-termico-pastel",
    title: "Vaso Térmico Stanley",
    desc: "Con manija.",
    price: 25000,
    category: "Vasos",
    kit: false,
    img: "images/vaso-termico-pastel.jpg",
    variants: [
      { id: "v1", label: "Celeste", reserved: false },
      { id: "v2", label: "Blanco", reserved: false },
      { id: "v3", label: "Rosa", reserved: false }
    ]
  },
  {
    id: "botella-acero-750ml-colores",
    title: "Botella de Acero 750ML",
    desc: "Botella térmica.",
    price: 15000,
    category: "Termos",
    kit: false,
    img: "images/botella-acero-750ml-colores.jpg",
    variants: [
      { id: "v1", label: "Rosa", reserved: false },
      { id: "v2", label: "Verde", reserved: false },
      { id: "v3", label: "Celeste", reserved: false },
      { id: "v4", label: "Negro", reserved: false },
      { id: "v5", label: "Rojo", reserved: false }
    ]
  },
  {
    id: "mate-listo-acero-1l",
    title: "Mate Listo de Acero 1 Litro",
    desc: "Termo con mate incorporado.",
    price: 23000,
    category: "Accesorios",
    kit: false,
    img: "images/mate-listo-acero-1l.jpg",
    variants: [{ id: "u1", label: "Acero", reserved: false }]
  },
  {
    id: "set-utensilios-cuchillos-tabla",
    title: "Set de Utensilios de Cocina con Cuchillos y Tabla",
    desc: "20 piezas: utensilios de cocina, set de cuchillos y tabla de picar.",
    price: 35000,
    category: "Cocina",
    kit: true,
    img: "images/set-utensilios-cuchillos-tabla.jpg",
    variants: [{ id: "u1", label: "Único", reserved: false }]
  },
  {
    id: "termo-12l-gris-blanco",
    title: "Termo Stanley 1.2L",
    desc: "Aislado al vacío.",
    price: 25000,
    category: "Termos",
    kit: false,
    img: "images/termo-12l-gris-blanco.jpg",
    variants: [
      { id: "v1", label: "Gris claro", reserved: false },
      { id: "v2", label: "Blanco", reserved: false }
    ]
  },
  {
    id: "cuchillo-stanley",
    title: "Cuchillo Stanley",
    desc: "Acero inoxidable con detalle dorado.",
    price: 3000,
    category: "Cocina",
    kit: false,
    img: "images/cuchillo-stanley.jpg",
    variants: [{ id: "u1", label: "Único", reserved: false }]
  },
  {
    id: "vaso-cafetero-sensor",
    title: "Vaso Cafetero Stanley con Sensor de Temperatura",
    desc: "Indicador de temperatura en la tapa.",
    price: 23500,
    category: "Vasos",
    kit: false,
    img: "images/vaso-cafetero-sensor.jpg",
    variants: [
      { id: "v1", label: "Verde", reserved: false },
      { id: "v2", label: "Blanco", reserved: false },
      { id: "v3", label: "Rosa", reserved: false }
    ]
  },
  {
    id: "set-completo-12l-35negro",
    title: "Set Completo Stanley 1.2 Litro",
    desc: "Termo + mate + 2 latas.",
    price: 35000,
    category: "Kits",
    kit: true,
    img: "images/set-completo-12l-35negro.jpg",
    variants: [
      { id: "v1", label: "Negro", reserved: false },
      { id: "v2", label: "Celeste", reserved: false },
      { id: "v3", label: "Blanco", reserved: false },
      { id: "v4", label: "Azul", reserved: false },
      { id: "v5", label: "Rosa", reserved: false }
    ]
  },
  {
    id: "mate-acero-160ml",
    title: "Mate de Acero Stanley 160ML",
    desc: "Aislado al vacío.",
    price: 10000,
    category: "Accesorios",
    kit: false,
    img: "images/mate-acero-160ml.jpg",
    variants: [{ id: "u1", label: "Acero", reserved: false }]
  },
  {
    id: "vaso-cafetero-azul-sensor",
    title: "Vaso Cafetero Stanley con Sensor de Temperatura 500ML",
    desc: "Indicador de temperatura en la tapa.",
    price: 20000,
    category: "Vasos",
    kit: false,
    img: "images/vaso-cafetero-azul-sensor.jpg",
    variants: [{ id: "v1", label: "Azul", reserved: false }]
  },
  {
    id: "termo-mate-listo-2en1",
    title: "Termo + Mate Listo 2 en 1, 750ML",
    desc: "Trae 2 tapas: una para usarlo como mate listo y otra para usarlo como termo.",
    price: 25000,
    category: "Accesorios",
    kit: true,
    img: "images/termo-mate-listo-2en1.jpg",
    variants: [{ id: "u1", label: "Único", reserved: false }]
  },
  {
    id: "set-completo-1l-375",
    title: "Set Completo Stanley 1 Litro",
    desc: "Termo + mate + 2 latas.",
    price: 37500,
    category: "Kits",
    kit: true,
    img: "images/set-completo-1l-375.jpg",
    variants: [{ id: "v1", label: "Set completo", reserved: false }]
  },
  {
    id: "termo-1l-negro-33",
    title: "Termo Stanley 1 Litro Completo",
    desc: "Aislado al vacío.",
    price: 33000,
    category: "Termos",
    kit: false,
    img: "images/termo-1l-negro-33.jpg",
    variants: [{ id: "v1", label: "Negro", reserved: false }]
  }
];
