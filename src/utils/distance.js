// fileName: src/utils/distance.js

/**
 * Formate une distance en mètres vers une chaîne lisible (m ou km).
 * @param {number} meters - La distance en mètres.
 * @returns {string} - La distance formatée (ex: "500 m" ou "2.5 km").
 */
export const formatDistance = (meters) => {
  if (meters === null || meters === undefined) return '';
  
  // Si moins de 1km, afficher en mètres
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  
  // Sinon afficher en km avec 1 décimale
  return `${(meters / 1000).toFixed(1)} km`;
};

/**
 * Calcule la distance entre deux coordonnées géographiques (Formule de Haversine).
 * Utile pour trier les résultats côté client si nécessaire.
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @returns {number} - Distance en mètres.
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Rayon de la terre en mètres
  const φ1 = lat1 * Math.PI / 180; // φ, λ en radians
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // en mètres
};