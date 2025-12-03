import React from 'react';
import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { isOpenNow } from '../utils/timeFormat';

export default function AdminCard({ admin, onClick }) {
  const { t } = useTranslation();
  const open = isOpenNow(admin.opening_hours);

  // Couleurs d'icônes basées sur ton image (fonds pastels)
  const getIconStyle = (type) => {
    switch(type) {
      case 'mairie': return 'bg-emerald-100 text-emerald-700';
      case 'commissariat': return 'bg-blue-100 text-blue-700';
      case 'cnss': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div 
      onClick={() => onClick && onClick(admin)}
      className="card-widget p-4 flex items-center gap-4 cursor-pointer bg-white mb-3"
    >
      {/* 1. Carré Icône (Gauche) */}
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${getIconStyle(admin.type)}`}>
        {/* On pourrait mettre une icône spécifique ici, ex: Building */}
        <span className="font-bold text-lg">{admin.name.charAt(0)}</span>
      </div>

      {/* 2. Contenu Texte (Milieu) */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-900 truncate text-base">
          {admin.name}
        </h3>
        <p className="text-xs text-gray-500 flex items-center gap-1 truncate mt-0.5">
          <MapPin size={12} />
          {admin.quartier}
        </p>
        <p className="text-xs font-medium text-emerald-600 mt-1">
          {t(`admin.types.${admin.type}`)}
        </p>
      </div>

      {/* 3. Indicateurs (Droite - comme sur l'image) */}
      <div className="flex flex-col items-end gap-2">
        {/* Point indicateur d'ouverture (Vert ou Orange) */}
        <div className={`w-3 h-3 rounded-full ${open ? 'bg-emerald-500' : 'bg-red-400'} shadow-sm`}></div>
        
        {/* Petit texte de distance si dispo */}
        {admin.distance && (
          <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {(admin.distance / 1000).toFixed(1)}km
          </span>
        )}
      </div>
    </div>
  );
}