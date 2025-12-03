import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Traductions initiales (Français)
const resources = {
  fr: {
    translation: {
      "app": {
        "title": "AdminLocator CG",
        "description": "Localisez instantanément les administrations publiques au Congo."
      },
      "search": {
        "placeholder": "Rechercher une mairie, un commissariat...",
        "useLocation": "Me géolocaliser"
      },
      "admin": {
        "types": {
          "mairie": "Mairie",
          "commissariat": "Commissariat",
          "prefecture": "Préfecture",
          "cnss": "CNSS",
          "tribunal": "Tribunal",
          "sante": "Santé",
          "autre": "Autre"
        }
      },
      "card": {
        "openNow": "Ouvert",
        "closedNow": "Fermé",
        "viewDetails": "Voir détails"
      },
      "detail": {
        "verified": "Administration Vérifiée",
        "notVerified": "Non vérifié",
        "hours": "Horaires d'ouverture",
        "services": "Services disponibles",
        "documents": "Documents requis",
        "description": "À propos",
        "source": "Source des données"
      },
      "itinerary": {
        "title": "Itinéraire",
        "exportToGoogleMaps": "Ouvrir dans Google Maps"
      },
      "report": {
        "title": "Signaler une erreur",
        "message": "Description du problème",
        "contact": "Votre contact (facultatif)",
        "submit": "Envoyer le signalement"
      },
      "common": {
        "loading": "Chargement...",
        "cancel": "Annuler",
        "error": "Une erreur est survenue"
      }
    }
  }
  // Tu pourras ajouter 'ln' (Lingala) et 'kt' (Kituba) ici plus tard
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // Langue par défaut
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false // React protège déjà contre XSS
    }
  });

export default i18n;