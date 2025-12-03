import React, { useState } from 'react';
import { Search, Navigation, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SearchBar({ onSearch, onLocationRequest, onFilterChange }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    quartier: ''
  });

  const types = [
    { value: '', label: 'Tous' },
    { value: 'mairie', label: t('admin.types.mairie') },
    { value: 'commissariat', label: t('admin.types.commissariat') },
    { value: 'prefecture', label: t('admin.types.prefecture') },
    { value: 'cnss', label: t('admin.types.cnss') },
    { value: 'tribunal', label: t('admin.types.tribunal') },
    { value: 'autre', label: t('admin.types.autre') }
  ];

  const handleSearch = () => {
    onSearch({ q: query, ...filters });
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full space-y-4 animate-fade-in">
      {/* Barre de recherche principale */}
      <div className="flex gap-3 flex-wrap md:flex-nowrap">
        <div className="flex-1 relative group w-full md:w-auto">
          <Search
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6c757d] group-focus-within:text-[#26aa7e] transition-colors"
          />
          <input
            type="text"
            placeholder={t('search.placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-[#e9ecef] focus:border-[#26aa7e] focus:outline-none transition-all text-lg"
          />
        </div>
        
        <button
          onClick={handleSearch}
          className="px-8 py-4 bg-[#26aa7e] text-white rounded-xl font-semibold hover:bg-[#1f8865] transition-all hover:scale-105 shadow-md hover:shadow-xl whitespace-nowrap"
        >
          {t('search.byName') || 'Rechercher'}
        </button>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-6 py-4 rounded-xl font-semibold transition-all ${
            showFilters
              ? 'bg-[#26aa7e] text-white'
              : 'bg-white border-2 border-[#26aa7e] text-[#26aa7e]'
          }`}
        >
          <Filter size={20} />
        </button>

        <button
          onClick={onLocationRequest}
          className="px-6 py-4 bg-[#ffc107] text-[#0d0f11] rounded-xl font-semibold hover:bg-[#e6ad06] transition-all hover:scale-105 shadow-md hover:shadow-xl flex items-center gap-2"
        >
          <Navigation size={20} />
        </button>
      </div>

      {/* Filtres */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white rounded-xl shadow-lg animate-slide-in-right">
          <div>
            <label className="block text-sm font-semibold text-[#495057] mb-2">
              {t('search.byType')}
            </label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#e9ecef] focus:border-[#26aa7e] focus:outline-none transition-all"
            >
              {types.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#495057] mb-2">
              {t('search.byQuartier')}
            </label>
            <input
              type="text"
              value={filters.quartier}
              onChange={(e) => handleFilterChange('quartier', e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ex: Poto-Poto, Moungali..."
              className="w-full px-4 py-3 rounded-lg border-2 border-[#e9ecef] focus:border-[#26aa7e] focus:outline-none transition-all"
            />
          </div>
        </div>
      )}
    </div>
  );
}