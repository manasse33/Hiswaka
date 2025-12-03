// fileName: src/utils/timeFormat.js

const DAYS_MAP = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

/**
 * Détermine si une administration est ouverte actuellement.
 * Prend en compte le fuseau horaire du Congo (WAT).
 * * @param {Object} openingHours - L'objet JSON des horaires (ex: { mon: "08:00-16:00", ... })
 * @returns {boolean|null} - true (ouvert), false (fermé), ou null (données manquantes).
 */
export const isOpenNow = (openingHours) => {
  if (!openingHours) return null;

  // 1. Obtenir l'heure actuelle à Brazzaville (WAT)
  // Cela garantit que l'état Ouvert/Fermé est correct même si l'utilisateur est à l'étranger.
  const now = new Date();
  const options = { timeZone: 'Africa/Brazzaville', hour12: false };
  
  // Récupérer le jour actuel à Brazzaville (0-6)
  // On utilise une astuce car getDay() renvoie l'heure locale du navigateur
  const congoTimeStr = now.toLocaleString('en-US', { timeZone: 'Africa/Brazzaville' });
  const congoDate = new Date(congoTimeStr);
  const currentDayIndex = congoDate.getDay(); // 0 = Dimanche
  const currentKey = DAYS_MAP[currentDayIndex];

  // 2. Récupérer la plage horaire du jour
  const range = openingHours[currentKey];

  // Si pas d'horaire ou null pour ce jour -> Fermé
  if (!range) return false;

  // Si "24/24" ou "00:00-23:59" -> Ouvert
  if (range === '24/7' || range === '00:00-23:59') return true;

  // 3. Parser les heures (Format attendu: "HH:MM-HH:MM")
  try {
    const [startStr, endStr] = range.split('-');
    
    if (!startStr || !endStr) return false;

    const currentMinutes = congoDate.getHours() * 60 + congoDate.getMinutes();
    
    const [startH, startM] = startStr.split(':').map(Number);
    const [endH, endM] = endStr.split(':').map(Number);
    
    const startTotalMinutes = startH * 60 + startM;
    const endTotalMinutes = endH * 60 + endM;

    // Vérifier si on est dans l'intervalle
    return currentMinutes >= startTotalMinutes && currentMinutes < endTotalMinutes;

  } catch (error) {
    console.error("Erreur de format d'heure", error);
    return null;
  }
};

/**
 * Formate un jour spécifique pour l'affichage (ex: "08:00 - 16:00")
 */
export const formatDaySchedule = (range) => {
  if (!range) return 'Fermé';
  if (range === '00:00-23:59') return '24h/24';
  return range.replace('-', ' - ');
};