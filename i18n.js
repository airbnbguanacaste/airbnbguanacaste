// All visible text lives here, in English (en) and Spanish (es).
// Business names are NOT translated: they come from src/data/places.json unchanged.

// Order the category filters appear in. "other" only shows if a place uses it.
export const CATEGORY_ORDER = [
  'attractions',
  'restaurants',
  'streetFood',
  'coffee',
  'groceries',
  'transport',
  'other',
];

export const translations = {
  en: {
    siteName: 'Explore Guanacaste',
    languageLabel: 'Language',
    nav: { places: 'Places', map: 'Map' },
    hero: {
      eyebrow: 'Barrio Guanacaste · Tegucigalpa',
      title: 'Explore Guanacaste',
      subtitle:
        'Cafés, food, culture and everyday essentials around your stay, all in one simple guide.',
      browse: 'Browse places',
      map: 'Explore the map',
    },
    places: {
      title: 'Places to discover',
      intro: 'Search by name or choose a category.',
      searchLabel: 'Search places by name',
      searchPlaceholder: 'Search by name…',
      filtersLabel: 'Filter by category',
      all: 'All places',
      count: (n, total) =>
        n === total
          ? `${n} ${n === 1 ? 'place' : 'places'}`
          : `Showing ${n} of ${total} places`,
      emptyTitle: 'No places found',
      emptyText: 'Try a different name or choose another category.',
      clear: 'Clear search and filters',
    },
    categories: {
      attractions: 'Attractions',
      restaurants: 'Restaurants & Bars',
      streetFood: 'Street Food',
      coffee: 'Coffee Shops',
      groceries: 'Groceries',
      transport: 'Transport',
      other: 'Other',
    },
    // Short, generic descriptions. They make no specific claims about any business.
    descriptions: {
      attractions: 'A place of interest to explore in the area.',
      restaurants: 'A spot to eat or drink in the area.',
      streetFood: 'A casual spot for a quick bite.',
      coffee: 'A spot for coffee and a break.',
      groceries: 'A place to pick up groceries and everyday items.',
      transport: 'A transport point in the area.',
      other: 'A place on our map.',
    },
    card: {
      directions: 'Get directions',
      opensInNewTab: 'opens in a new tab',
    },
    map: {
      title: 'Explore the map',
      text: 'See all the places from this guide together on our interactive Google map.',
      open: 'Open the interactive map',
      embedTitle: 'Interactive map of places in Barrio Guanacaste',
    },
    footer: {
      line: 'A guest guide for our apartments in Barrio Guanacaste, Tegucigalpa.',
      note: 'Details can change. Please check opening hours and availability on Google Maps before you go.',
    },
  },

  es: {
    siteName: 'Explorá Guanacaste',
    languageLabel: 'Idioma',
    nav: { places: 'Lugares', map: 'Mapa' },
    hero: {
      eyebrow: 'Barrio Guanacaste · Tegucigalpa',
      title: 'Explorá Guanacaste',
      subtitle:
        'Cafés, comida, cultura y lo esencial del día a día alrededor de tu estadía, en una guía sencilla.',
      browse: 'Ver lugares',
      map: 'Explorá el mapa',
    },
    places: {
      title: 'Lugares por descubrir',
      intro: 'Buscá por nombre o elegí una categoría.',
      searchLabel: 'Buscar lugares por nombre',
      searchPlaceholder: 'Buscar por nombre…',
      filtersLabel: 'Filtrar por categoría',
      all: 'Todos los lugares',
      count: (n, total) =>
        n === total
          ? `${n} ${n === 1 ? 'lugar' : 'lugares'}`
          : `Mostrando ${n} de ${total} lugares`,
      emptyTitle: 'No encontramos lugares',
      emptyText: 'Probá con otro nombre o elegí otra categoría.',
      clear: 'Borrar búsqueda y filtros',
    },
    categories: {
      attractions: 'Lugares de interés',
      restaurants: 'Restaurantes y bares',
      streetFood: 'Comida callejera',
      coffee: 'Cafés',
      groceries: 'Supermercados y tiendas',
      transport: 'Transporte',
      other: 'Otros',
    },
    descriptions: {
      attractions: 'Un lugar de interés para conocer en la zona.',
      restaurants: 'Un lugar para comer o tomar algo en la zona.',
      streetFood: 'Un lugar informal para algo rápido.',
      coffee: 'Un lugar para tomar un café y hacer una pausa.',
      groceries: 'Un lugar para comprar víveres y artículos del día a día.',
      transport: 'Un punto de transporte en la zona.',
      other: 'Un lugar de nuestro mapa.',
    },
    card: {
      directions: 'Cómo llegar',
      opensInNewTab: 'se abre en una pestaña nueva',
    },
    map: {
      title: 'Explorá el mapa',
      text: 'Mirá todos los lugares de esta guía juntos en nuestro mapa interactivo de Google.',
      open: 'Abrir el mapa interactivo',
      embedTitle: 'Mapa interactivo de lugares en Barrio Guanacaste',
    },
    footer: {
      line: 'Una guía para huéspedes de nuestros apartamentos en Barrio Guanacaste, Tegucigalpa.',
      note: 'Los detalles pueden cambiar. Revisá los horarios y la disponibilidad en Google Maps antes de ir.',
    },
  },
};
