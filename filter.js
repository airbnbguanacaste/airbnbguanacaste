// Search + category filtering. Both work together.

// Lowercase and strip accents so "cafe" finds "Café" and "angeles" finds "Ángeles".
export function normalize(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

export function filterPlaces(places, { query = '', category = 'all' } = {}) {
  const q = normalize(query);
  return places.filter((place) => {
    const matchesCategory = category === 'all' || place.category === category;
    const matchesQuery = q === '' || normalize(place.name).includes(q);
    return matchesCategory && matchesQuery;
  });
}
