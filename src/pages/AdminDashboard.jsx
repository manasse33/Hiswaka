import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { 
  LayoutGrid, Users, Database, FileSpreadsheet, Bell, Search, 
  Settings, LogOut, ArrowUpRight, UploadCloud, CheckCircle, 
  Activity, Download, AlertCircle, ChevronDown 
} from 'lucide-react';

// --- MOCK DATA POUR LES GRAPHIQUES ---
const activityData = [
  { name: 'Lun', uploads: 4, requests: 2 },
  { name: 'Mar', uploads: 7, requests: 5 },
  { name: 'Mer', uploads: 3, requests: 1 },
  { name: 'Jeu', uploads: 12, requests: 8 },
  { name: 'Ven', uploads: 9, requests: 3 },
  { name: 'Sam', uploads: 2, requests: 0 },
  { name: 'Dim', uploads: 1, requests: 1 },
];

const storageData = [
    { name: 'Santé', value: 450 },
    { name: 'Éco', value: 320 },
    { name: 'Demo', value: 580 },
    { name: 'Agri', value: 120 },
];

// --- SOUS-COMPOSANT : ETL MODERNE ---
const ETLModule = () => {
    const [status, setStatus] = useState('idle');
    const [logs, setLogs] = useState([]);
    
    const runSimulation = () => {
        setStatus('processing');
        setLogs([]);
        const steps = [
            "Initialisation du worker Python...",
            "Chargement du modèle : SANTE_MORBIDITE_V2...",
            "Lecture du fichier .XLSX (2.4MB)...",
            "Nettoyage des colonnes (Strip whitespace)...",
            "Validation des types de données (INT, DATE)...",
            "Détection d'anomalies : 0 trouvé.",
            "Génération du fichier de sortie..."
        ];
        
        steps.forEach((step, index) => {
            setTimeout(() => {
                setLogs(prev => [...prev, step]);
                if(index === steps.length -1) setStatus('done');
            }, index * 800);
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
            {/* Colonne Gauche : Configuration */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Database className="text-emerald-600"/> Nouvelle Ingestion
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Domaine Statistique</label>
                            <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium">
                                <option>Santé Publique (OMS)</option>
                                <option>Démographie (RGPH)</option>
                                <option>Économie (IPC)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Période de référence</label>
                            <input type="month" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-emerald-50/50 hover:border-emerald-300 transition cursor-pointer group">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                            <UploadCloud size={32}/>
                        </div>
                        <h4 className="font-bold text-gray-900">Glisser-déposer le fichier brut</h4>
                        <p className="text-sm text-gray-500 mt-1">Excel (.xlsx) ou CSV. Max 50MB.</p>
                    </div>

                    <button 
                        onClick={runSimulation}
                        disabled={status === 'processing'}
                        className="w-full mt-6 bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
                    >
                        {status === 'processing' ? <Activity className="animate-spin"/> : <Settings/>} 
                        Lancer le Pipeline ETL
                    </button>
                </div>
            </div>

            {/* Colonne Droite : Logs & Résultat */}
            <div className="space-y-6">
                <div className="bg-gray-900 text-gray-300 p-5 rounded-2xl font-mono text-xs h-[400px] flex flex-col shadow-xl">
                    <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-2">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-gray-500 ml-2">etl-output.log</span>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2">
                        {logs.length === 0 && <span className="opacity-50">En attente de processus...</span>}
                        {logs.map((log, i) => (
                            <div key={i} className="animate-in fade-in slide-in-from-left-2">
                                <span className="text-emerald-500 mr-2">➜</span> {log}
                            </div>
                        ))}
                        {status === 'done' && <div className="text-emerald-400 font-bold mt-4">PROCESS COMPLETED SUCCESSFULLY.</div>}
                    </div>
                </div>

                {status === 'done' && (
                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center justify-between animate-in zoom-in">
                        <div className="flex items-center gap-3">
                            <FileSpreadsheet className="text-emerald-600"/>
                            <div>
                                <div className="font-bold text-emerald-900 text-sm">Données traitées</div>
                                <div className="text-xs text-emerald-700">clean_data_v1.csv</div>
                            </div>
                        </div>
                        <button className="p-2 bg-white rounded-lg text-emerald-700 hover:text-emerald-900 shadow-sm">
                            <Download size={18}/>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- COMPOSANT PRINCIPAL ---
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, etl, requests

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* 1. TOP NAVIGATION (Nouveau style) */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30 px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">H</div>
                <span className="font-extrabold text-xl tracking-tight text-gray-900">HISWACA<span className="text-emerald-600">.io</span></span>
            </div>
            
            {/* Menu Onglets */}
            <div className="hidden md:flex bg-gray-100/50 p-1 rounded-xl">
                {['Overview', 'ETL Pipeline', 'Requests'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                        className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                            activeTab === tab.toLowerCase().split(' ')[0]
                            ? 'bg-white text-emerald-700 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>

        <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
                <input type="text" placeholder="Rechercher..." className="pl-9 pr-4 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-200 rounded-full text-sm outline-none transition w-64"/>
            </div>
            <button className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-full transition">
                <Bell size={20}/>
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden md:block">
                    <div className="text-sm font-bold text-gray-900">Admin Principal</div>
                    <div className="text-xs text-gray-500">Superuser</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 cursor-pointer">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-bold text-emerald-700">JD</div>
                </div>
            </div>
        </div>
      </nav>

      {/* 2. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto p-6 md:p-8">
        
        {/* VIEW: OVERVIEW (Dashboard avec Graphiques) */}
        {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                
                {/* Header Section */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
                        <p className="text-gray-500 mt-1">Vue d'ensemble de l'activité du hub de données.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition shadow-sm">
                        <Download size={16}/> Exporter le rapport
                    </button>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <KpiCard title="Utilisateurs" value="1,240" change="+12%" icon={<Users className="text-blue-600"/>} color="bg-blue-50" />
                    <KpiCard title="Datasets" value="86" change="+4" icon={<Database className="text-purple-600"/>} color="bg-purple-50" />
                    <KpiCard title="Requêtes API" value="2.4M" change="+28%" icon={<Activity className="text-emerald-600"/>} color="bg-emerald-50" />
                    <KpiCard title="Demandes Accès" value="12" change="Attention" isAlert icon={<AlertCircle className="text-orange-600"/>} color="bg-orange-50" />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Graphique Principal */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-900">Activité Hebdomadaire</h3>
                            <select className="bg-gray-50 border border-gray-200 text-xs rounded-lg px-2 py-1 outline-none">
                                <option>7 derniers jours</option>
                                <option>Ce mois</option>
                            </select>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={activityData} barGap={8}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6"/>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:'#9ca3af', fontSize:12}} dy={10}/>
                                    <YAxis axisLine={false} tickLine={false} tick={{fill:'#9ca3af', fontSize:12}}/>
                                    <Tooltip 
                                        contentStyle={{backgroundColor: '#fff', borderRadius: '12px', border:'none', boxShadow:'0 10px 15px -3px rgba(0,0,0,0.1)'}}
                                        cursor={{fill: '#f9fafb'}}
                                    />
                                    <Bar dataKey="uploads" name="Fichiers importés" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
                                    <Bar dataKey="requests" name="Demandes d'accès" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Carte Secondaire */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-2">Répartition des Données</h3>
                        <p className="text-xs text-gray-500 mb-6">Volume par secteur d'activité</p>
                        <div className="space-y-4">
                            {storageData.map((item, index) => (
                                <div key={index}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-gray-700">{item.name}</span>
                                        <span className="text-gray-500 font-mono">{item.value} GB</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div 
                                            className="bg-gray-900 h-2 rounded-full transition-all duration-1000" 
                                            style={{width: `${(item.value / 600) * 100}%`, backgroundColor: index === 0 ? '#10b981' : index === 1 ? '#3b82f6' : '#6366f1'}}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition flex items-center justify-center gap-2">
                            Voir le détail du stockage <ArrowUpRight size={16}/>
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* VIEW: ETL PIPELINE */}
        {activeTab === 'etl' && <ETLModule />}

        {/* VIEW: REQUESTS (Tableau stylisé) */}
        {activeTab === 'requests' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">Demandes en attente</h3>
                        <p className="text-sm text-gray-500">Validez les partenaires pour l'accès API.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 shadow-sm">Filtrer</button>
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-white border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider">Organisation</th>
                            <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider">Statut</th>
                            <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {[1, 2, 3].map((i) => (
                            <tr key={i} className="hover:bg-gray-50/80 transition group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">OM</div>
                                        <div>
                                            <div className="font-bold text-gray-900">OMS - Bureau Congo</div>
                                            <div className="text-xs text-gray-500">Dr. Jean Malonga</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 font-mono">06 Déc 2024</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                                        En attente
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-emerald-600 font-bold text-sm flex items-center gap-1 ml-auto transition">
                                        Examiner <ArrowUpRight size={16}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}

      </main>
    </div>
  );
};

// Petit composant helper pour les cartes KPI
const KpiCard = ({ title, value, change, icon, color, isAlert }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
        <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} transition-transform group-hover:scale-110`}>
                {icon}
            </div>
            {isAlert && <span className="w-3 h-3 bg-red-500 rounded-full animate-ping"></span>}
        </div>
        <div>
            <div className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-1">{title}</div>
            <div className="flex items-baseline gap-2">
                <div className="text-2xl font-extrabold text-gray-900">{value}</div>
                <div className={`text-xs font-bold ${isAlert ? 'text-red-500' : 'text-emerald-500'}`}>{change}</div>
            </div>
        </div>
    </div>
);

export default AdminDashboard;