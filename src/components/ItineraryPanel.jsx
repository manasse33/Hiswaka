import React, { useState } from 'react';
import { Car, PersonStanding, MapPin, ExternalLink, ChevronRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ItineraryPanel({ route, onClose, destination, origin }) {
  const { t } = useTranslation();
  const [profile, setProfile] = useState('foot');

  if (!route) return null;

  const formatDuration = (seconds) => {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const formatDistance = (meters) => {
    if (meters < 1000) return `${Math.round(meters)} m`;
    return `${(meters / 1000).toFixed(1)} km`;
  };

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.latitude},${destination.longitude}&travelmode=${profile === 'foot' ? 'walking' : 'driving'}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-40 overflow-y-auto animate-slide-in-right">
      <div className="sticky top-0 bg-gradient-to-r from-[#26aa7e] to-[#1f8865] text-white p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{t('itinerary.title')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sélecteur de mode de transport */}
        <div className="flex gap-2">
          <button
            onClick={() => setProfile('foot')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              profile === 'foot'
                ? 'bg-white text-[#26aa7e]'
                : 'bg-white/10 border border-white/30 text-white'
            }`}
          >
            <PersonStanding size={20} className="mx-auto mb-1" />
            À pied
          </button>
          <button
            onClick={() => setProfile('driving')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              profile === 'driving'
                ? 'bg-white text-[#26aa7e]'
                : 'bg-white/10 border border-white/30 text-white'
            }`}
          >
            <Car size={20} className="mx-auto mb-1" />
            Voiture
          </button>
        </div>

        {/* Résumé du trajet */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="glass p-3 rounded-xl text-center">
            <div className="text-2xl font-bold">{formatDistance(route.distance)}</div>
            <div className="text-xs text-white/80 mt-1">Distance</div>
          </div>
          <div className="glass p-3 rounded-xl text-center">
            <div className="text-2xl font-bold">{formatDuration(route.duration)}</div>
            <div className="text-xs text-white/80 mt-1">Durée</div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="p-6 space-y-4">
        {/* Point de départ */}
        <div className="flex items-start gap-3 p-4 glass rounded-xl">
          <div className="w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center flex-shrink-0 mt-1">
            <MapPin size={16} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#6c757d]">Départ</p>
            <p className="text-[#212529]">Votre position</p>
          </div>
        </div>

        {/* Instructions de navigation */}
        {route.instructions && route.instructions.map((instruction, index) => (
          <div key={index} className="flex items-start gap-3 p-4 hover:bg-[#f8f9fa] rounded-xl transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#e9ecef] flex items-center justify-center flex-shrink-0 mt-1">
              <ChevronRight size={16} className="text-[#26aa7e]" />
            </div>
            <div className="flex-1">
              <p className="text-[#212529] mb-1">{instruction.text}</p>
              <p className="text-xs text-[#6c757d]">
                {formatDistance(instruction.distance)} · {formatDuration(instruction.duration)}
              </p>
            </div>
          </div>
        ))}

        {/* Destination */}
        <div className="flex items-start gap-3 p-4 glass rounded-xl">
          <div className="w-8 h-8 rounded-full bg-[#26aa7e] flex items-center justify-center flex-shrink-0 mt-1">
            <MapPin size={16} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#6c757d]">Destination</p>
            <p className="text-[#212529] font-semibold">{destination.name}</p>
            <p className="text-sm text-[#6c757d]">{destination.street_address}</p>
          </div>
        </div>

        {/* Bouton Google Maps */}
        <button
          onClick={openInGoogleMaps}
          className="w-full btn-secondary flex items-center justify-center gap-2"
        >
          <ExternalLink size={18} />
          {t('itinerary.exportToGoogleMaps')}
        </button>
      </div>
    </div>
  );
}