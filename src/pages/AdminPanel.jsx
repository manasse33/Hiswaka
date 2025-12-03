import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function AdminPanel() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { id: 'administrations', label: 'Administrations', icon: '🏛️' },
    { id: 'reports', label: 'Signalements', icon: '🚩' },
    { id: 'users', label: 'Utilisateurs', icon: '👥' }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#212529] mb-2">
            Panneau d'administration
          </h1>
          <p className="text-[#6c757d]">
            Bienvenue, <span className="font-semibold text-[#26aa7e]">{user?.name}</span>
          </p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#26aa7e] text-white shadow-lg'
                  : 'bg-white text-[#495057] hover:bg-[#f8f9fa]'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          <p className="text-[#6c757d]">
            Contenu à implémenter pour {activeTab}
          </p>
        </div>
      </div>
    </div>
  );
}