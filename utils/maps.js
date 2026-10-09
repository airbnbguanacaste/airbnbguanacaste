// Google Maps link helpers.

export function isValidCoord(lat, lng) {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    Math.abs(lat) <= 90 &&
    Math.abs(lng) <= 180 &&
    !(lat === 0 && lng === 0)
  );
}

// Directions link. Uses coordinates when valid, otherwise a search for the name.
export function directionsUrl(place) {
  if (isValidCoord(place.lat, place.lng)) {
    return `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
  }
  const query = encodeURIComponent(`${place.name} Tegucigalpa Honduras`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
