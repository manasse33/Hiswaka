import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Clock, FileText, AlertCircle, X, ChevronRight, Building2, Shield, Briefcase, FileCheck } from 'lucide-react';

// Données fictives améliorées
const MOCK_ADMINS = [
  { 
    id: 1, 
    name: "Mairie de Brazzaville", 
    type: "mairie", 
    quartier: "Centre-ville", 
    latitude: -4.2678, 
    longitude: 15.2815, 
    opening_hours: { mon: "08:00-16:00", tue: "08:00-16:00", wed: "08:00-16:00", thu: "08:00-16:00", fri: "08:00-15:00" }, 
    phone: "+242 06 666 0000",
    email: "contact@mairie-brazzaville.cg",
    verified: true,
    distance: "1.2 km",
    services: ["État civil", "Urbanisme", "Taxes locales"],
    street_address: "Avenue Félix Ébouè",
    status: "Ouvert"
  },
  { 
    id: 2, 
    name: "Mairie de Brazzaville (Annexe)", 
    type: "mairie", 
    quartier: "Poto-Poto", 
    latitude: -4.2590, 
    longitude: 15.2750, 
    opening_hours: { mon: "08:00-16:00", tue: "08:00-16:00", wed: "08:00-16:00" }, 
    phone: "+242 06 777 0000",
    verified: true,
    distance: "0.8 km",
    services: ["État civil", "Documents"],
    street_address: "Rue Sergeant Malamine",
    status: "Ouvert"
  },
  { 
    id: 3, 
    name: "CNSS", 
    type: "cnss", 
    quartier: "Bacongo", 
    latitude: -4.2700, 
    longitude: 15.2800, 
    opening_hours: { mon: "08:00-15:00", tue: "08:00-15:00", wed: "08:00-15:00", thu: "08:00-15:00", fri: "08:00-14:00" }, 
    phone: "+242 06 888 0000",
    verified: true,
    distance: "1.5 km",
    services: ["Affiliation", "Prestations"],
    street_address: "Avenue Maréchal Lyautey",
    status: "Ouvert"
  },
  { 
    id: 4, 
    name: "Poto-poto centre", 
    type: "commissariat", 
    quartier: "Brazzaville", 
    latitude: -4.2650, 
    longitude: 15.2820, 
    opening_hours: { mon: "24/24", tue: "24/24" },
    phone: "+242 06 555 0000",
    verified: true,
    distance: "2.1 km",
    services: ["Sécurité", "Urgences"],
    street_address: "Boulevard Alfred Raoul",
    status: "Ouvert"
  }
];

const ADMIN_TYPES = [
  { value: "all", label: "Tous", icon: Building2, color: "bg-gray-100 text-gray-700" },
  { value: "mairie", label: "Mairies", icon: Building2, color: "bg-emerald-100 text-emerald-700" },
  { value: "commissariat", label: "Commissariats", icon: Shield, color: "bg-red-100 text-red-700" },
  { value: "cnss", label: "CNSS", icon: Briefcase, color: "bg-blue-100 text-blue-700" },
  { value: "prefecture", label: "Préfectures", icon: FileCheck, color: "bg-purple-100 text-purple-700" },
];

export default function Home() {
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredAdmins = MOCK_ADMINS.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         admin.quartier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || admin.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getAdminIcon = (type) => {
    const typeObj = ADMIN_TYPES.find(t => t.value === type);
    return typeObj ? typeObj.icon : Building2;
  };

  const getAdminColor = (type) => {
    switch(type) {
      case 'mairie': return 'bg-[#18664c]';
      case 'commissariat': return 'bg-red-500';
      case 'cnss': return 'bg-yellow-500';
      case 'prefecture': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#f3f4f6]">
      
      {/* HEADER avec logo et style vert */}
      <header className="absolute top-0 left-0 right-0 z-30 bg-[#18664c] shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <MapPin className="text-[#18664c]" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Home Page</h1>
            </div>
          </div>
        </div>
      </header>

      {/* BARRE DE RECHERCHE style moderne arrondie */}
      <div className="absolute top-20 left-0 right-0 z-20 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-1 border border-gray-100">
            <div className="flex items-center gap-2 px-3 py-2">
              <Search className="text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="Rechercher une administration..."
                className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CARTE SIMULÉE avec marqueurs */}
      <div className="absolute inset-0 top-36 z-0 bg-[#e8f5f0] rounded-t-3xl mx-4 overflow-hidden">
        {/* Carte de fond simulée */}
        <div className="w-full h-full relative bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwwLDAsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
          
          {/* Marqueurs */}
          {filteredAdmins.map((admin, idx) => {
            const Icon = getAdminIcon(admin.type);
            return (
              <div
                key={admin.id}
                className={`absolute w-12 h-12 transition-all duration-300 cursor-pointer ${
                  hoveredCard === admin.id ? 'scale-125 z-20' : 'z-10'
                }`}
                style={{
                  top: `${25 + idx * 15}%`,
                  left: `${30 + idx * 12}%`,
                }}
                onClick={() => setSelectedAdmin(admin)}
                onMouseEnter={() => setHoveredCard(admin.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`w-10 h-10 ${getAdminColor(admin.type)} rounded-full flex items-center justify-center shadow-lg`}>
                  <Icon size={20} className="text-white" />
                </div>
                {admin.verified && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center border-2 border-emerald-500">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* LISTE DES ADMINISTRATIONS - Style carte moderne */}
      <div className="absolute z-10 bottom-0 left-0 right-0 md:top-40 md:bottom-auto md:left-6 md:right-auto md:w-[450px]">
        <div className="bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[65vh] md:max-h-[calc(100vh-180px)] flex flex-col">
          
          {/* En-tête avec indicateur de localisation */}
          <div className="px-5 py-4 bg-[#18664c] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin size={20} />
              <span className="font-semibold">É Kalamu-brazzaville</span>
            </div>
          </div>

          {/* Liste scrollable des administrations */}
          <div className="overflow-y-auto flex-1 p-4 space-y-3 no-scrollbar">
            {filteredAdmins.map(admin => {
              const Icon = getAdminIcon(admin.type);
              return (
                <div
                  key={admin.id}
                  className={`group bg-white rounded-2xl p-4 border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                    selectedAdmin?.id === admin.id 
                      ? 'border-[#18664c] shadow-lg' 
                      : 'border-gray-200 hover:border-[#26aa7e]'
                  } ${hoveredCard === admin.id ? 'ring-2 ring-[#26aa7e] ring-opacity-50' : ''}`}
                  onClick={() => setSelectedAdmin(admin)}
                  onMouseEnter={() => setHoveredCard(admin.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-start gap-3">
                    {/* Icône colorée */}
                    <div className={`p-2.5 ${getAdminColor(admin.type)} rounded-xl flex-shrink-0`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-bold text-gray-900 text-sm leading-tight">
                          {admin.name}
                        </h3>
                        {admin.verified && (
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-500 mb-2">{admin.quartier}</p>

                      {/* Services tags */}
                      {admin.services && admin.services.length > 0 && (
                        <div className="flex gap-1.5 mb-2 flex-wrap">
                          {admin.services.slice(0, 2).map((service, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                              {service}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODALE DÉTAIL - Style moderne avec informations pratiques */}
      {selectedAdmin && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/50 backdrop-blur-sm">
          <div 
            className="bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-lg max-h-[85vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* En-tête avec badge "Vérifié" */}
            <div className="relative bg-[#18664c] text-white p-6">
              <button 
                onClick={() => setSelectedAdmin(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-start gap-4">
                <h2 className="text-xl font-bold flex-1 pr-8">Informations pratiques</h2>
              </div>
              
              <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <h3 className="font-bold text-lg mb-1">{selectedAdmin.name}</h3>
                {selectedAdmin.verified && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-semibold">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Vérifié
                  </div>
                )}
              </div>
            </div>

            {/* Contenu scrollable avec sections */}
            <div className="overflow-y-auto max-h-[calc(85vh-160px)] p-5 space-y-4 no-scrollbar">
              
              {/* Section Horaires avec badge statut */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                    <Clock size={16} className="text-[#18664c]" />
                    Horaires
                  </h4>
                  <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">
                    Vérifié
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  {selectedAdmin.opening_hours ? (
                    Object.entries(selectedAdmin.opening_hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between items-center">
                        <span className="text-gray-600 capitalize">
                          {day === 'mon' ? 'Lundi' : day === 'tue' ? 'Mardi' : day === 'wed' ? 'Mercredi' : day === 'thu' ? 'Jeudi' : 'Vendredi'}
                        </span>
                        <span className="text-gray-900 font-semibold">{hours || 'Fermé'}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Horaires non disponibles</p>
                  )}
                </div>
              </div>

              {/* Section Téléphone */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <Phone size={16} className="text-[#18664c]" />
                  Téléphone
                </h4>
                <p className="text-gray-900 font-semibold">{selectedAdmin.phone}</p>
              </div>

              {/* Section Documents Requis */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <FileText size={16} className="text-[#18664c]" />
                  Documents Requis
                </h4>
                <div className="space-y-2">
                  {selectedAdmin.services && selectedAdmin.services.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-[#18664c] rounded-full"></div>
                      {service}
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Signaler une erreur */}
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-colors">
                <AlertCircle size={18} className="text-red-500" />
                Signaler une erreur
              </button>

              {/* Boutons d'action principaux */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#ffc107] text-gray-900 rounded-2xl font-bold hover:bg-[#ffb300] transition-all shadow-md">
                  Voir l'itinéraire
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-all shadow-md">
                  Signaler une erreur
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BADGES FLOTTANTS - Style de l'image */}
      <div className="absolute top-24 right-6 z-20 space-y-3 hidden md:block">
        {/* Badge "Informations mises à jour" */}
        <div className="bg-[#18664c] text-white px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2 animate-in slide-in-from-right">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span className="text-sm font-semibold">Informations mises à jour</span>
        </div>

        {/* Badge d'avertissement */}
        <div className="bg-yellow-400 text-gray-900 px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2">
          <AlertCircle size={18} />
          <div className="text-xs">
            <div className="font-bold">Attention : Horaires</div>
            <div className="text-xs">exceptionnels ce jour</div>
          </div>
        </div>

        {/* Badge d'erreur */}
        <div className="bg-red-500 text-white px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2">
          <X size={18} />
          <div className="text-xs">
            <div className="font-bold">Erreur : Impossible</div>
            <div className="text-xs">de changer erreur</div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes slide-in-from-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-in {
          animation: slide-in-from-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}