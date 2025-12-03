import React, { useState } from 'react';
import { 
  BarChart3, Globe, Search, ArrowRight, Menu, X, 
  Database, FileText, ChevronRight, Layers, 
  PieChart, TrendingUp, Download, Calendar, Users 
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Fonction de navigation simple
  const navigate = (page) => {
    setActiveTab(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 relative selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* --- TEXTURE DE FOND (L'élément qui change tout) --- */}
      {/* Cette grille subtile donne l'aspect "Papier millimétré / Données" */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* --- HEADER --- */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('home')}>
            {/* Logo Conceptuel Géométrique */}
            <div className="w-10 h-10 bg-emerald-800 rounded-lg flex items-center justify-center relative overflow-hidden shadow-lg">
                <div className="absolute w-full h-1/3 bg-yellow-400 bottom-0 rotate-12 scale-150 translate-y-2"></div>
                <div className="absolute w-1/3 h-full bg-red-600 right-0 top-0"></div>
                <span className="relative z-10 text-white font-bold text-lg">H</span>
            </div>
            <div className="leading-tight">
              <div className="font-bold text-xl tracking-tight text-gray-900">HISWACA</div>
              <div className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">République du Congo</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {['home', 'donnees', 'projets', 'ressources'].map((item) => (
              <button 
                key={item}
                onClick={() => navigate(item)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === item 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </nav>

          <button className="hidden md:flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-emerald-700 transition shadow-lg hover:shadow-emerald-900/20 transform hover:-translate-y-0.5">
            <Database size={16} /> Portail Données
          </button>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-600">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 flex flex-col space-y-2 shadow-xl absolute w-full z-50">
            {['home', 'donnees', 'projets', 'ressources'].map((item) => (
               <button key={item} onClick={() => navigate(item)} className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 font-medium capitalize">
                 {item}
               </button>
            ))}
            <button className="w-full bg-emerald-700 text-white p-3 rounded-lg font-bold mt-2">Accéder au Portail</button>
          </div>
        )}
      </header>

      {/* --- MAIN CONTENT SWITCHER --- */}
      <main className="relative z-10 pt-20">
        {activeTab === 'home' && <Home navigate={navigate} />}
        {activeTab === 'donnees' && <DataPage />}
        {activeTab === 'projets' && <ProjectsPage />}
        {activeTab === 'ressources' && <ResourcesPage />}
      </main>

      {/* --- FOOTER UNIQUE --- */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-20 relative overflow-hidden">
        {/* Ligne tricolore décorative */}
        <div className="absolute top-0 left-0 w-full h-1 flex">
            <div className="w-1/3 bg-emerald-600"></div>
            <div className="w-1/3 bg-yellow-400"></div>
            <div className="w-1/3 bg-red-600"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
            <div className="max-w-md">
              <h4 className="font-bold text-2xl mb-4 text-gray-900">HISWACA CONGO</h4>
              <p className="text-gray-500 leading-relaxed">
                Le levier numérique pour l'harmonisation et l'amélioration des statistiques. 
                Une initiative soutenue par la Banque Mondiale pour un développement piloté par la donnée.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-12">
                <div>
                    <h5 className="font-bold text-gray-900 mb-4">Projet</h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li><a href="#" className="hover:text-emerald-600">Mission</a></li>
                        <li><a href="#" className="hover:text-emerald-600">Équipe</a></li>
                        <li><a href="#" className="hover:text-emerald-600">Partenaires</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold text-gray-900 mb-4">Contact</h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>Brazzaville, République du Congo</li>
                        <li>contact@hiswaca.cg</li>
                        <li>+242 06 491 16 16</li>
                    </ul>
                </div>
            </div>
          </div>
          
          <div className="text-center text-gray-400 text-sm pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
            <span>&copy; 2025 HISWACA Congo.</span>
            <div className="flex gap-4 mt-2 md:mt-0">
                <span>Politique de Confidentialité</span>
                <span>Mentions Légales</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                PAGE D'ACCUEIL                              */
/* -------------------------------------------------------------------------- */

const Home = ({ navigate }) => (
  <div className="animate-in fade-in duration-700">
    
    {/* --- HERO SECTION ASYMÉTRIQUE --- */}
    <section className="pt-16 pb-24 md:pt-28 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
              {/* <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> */}
              {/* Données Officielles */}
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
              L'avenir du Congo s'écrit en <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800 relative">
                chiffres.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-400 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
              La plateforme de référence pour l'harmonisation statistique en Afrique Centrale. Fiabilité, transparence et accessibilité.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('donnees')} className="flex items-center gap-2 bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-800 transition shadow-[0_10px_20px_-10px_rgba(4,120,87,0.5)]">
                Explorer le Portail <ArrowRight size={20} />
              </button>
              <button onClick={() => navigate('projets')} className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold hover:border-gray-300 hover:bg-gray-50 transition">
                Voir les Projets
              </button>
            </div>
          </div>

          {/* VISUEL ABSTRAIT "DATA STREAM" */}
          <div className="lg:w-1/2 relative">
             <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                {/* Cercles décoratifs */}
                <div className="absolute inset-0 border border-gray-200 rounded-full opacity-50"></div>
                <div className="absolute inset-12 border border-gray-200 rounded-full opacity-50 border-dashed animate-[spin_60s_linear_infinite]"></div>
                
                {/* Carte Flottante 1 */}
                <div className="absolute top-10 right-0 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 w-48 animate-[bounce_4s_infinite]">
                    <div className="text-xs text-gray-400 uppercase font-bold mb-2">Croissance PIB</div>
                    <div className="text-3xl font-bold text-emerald-600">+4.2%</div>
                    <div className="h-1 w-full bg-gray-100 mt-2 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-emerald-500 rounded-full"></div>
                    </div>
                </div>

                {/* Carte Flottante 2 */}
                <div className="absolute bottom-20 left-0 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 w-52 animate-[bounce_5s_infinite] delay-700">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600"><Users size={18}/></div>
                        <div className="text-xs text-gray-400 uppercase font-bold">Démographie</div>
                    </div>
                    <div className="text-xl font-bold text-gray-800">5.8 Millions</div>
                </div>

                {/* Logo Central Abstrait */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gray-900 rounded-3xl rotate-12 flex items-center justify-center shadow-2xl">
                         <BarChart3 className="text-white w-16 h-16" />
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>

    {/* --- SECTION CARTES "STYLE DOSSIER TECHNIQUE" (Amélioration demandée) --- */}
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Piliers Stratégiques</h2>
                <div className="w-20 h-1.5 bg-yellow-400 rounded-full"></div>
            </div>
            <p className="text-gray-500 max-w-md mt-4 md:mt-0 text-right">
                Une approche systémique pour transformer la donnée brute en intelligence publique.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
                icon={<Database className="text-emerald-600" />}
                title="Collecte & Stockage"
                desc="Architecture centralisée pour la sécurisation du patrimoine statistique national."
                stat="100% Digitalisé"
                color="emerald"
                navigate={navigate}
                target="donnees"
            />
            <FeatureCard 
                icon={<Globe className="text-yellow-600" />}
                title="Harmonisation"
                desc="Alignement sur les standards internationaux (SNA 2008) et régionaux (CEMAC)."
                stat="12 Pays membres"
                color="yellow"
                navigate={navigate}
                target="projets"
            />
            <FeatureCard 
                icon={<Layers className="text-red-600" />}
                title="Diffusion Open Data"
                desc="Portail accessible au public, chercheurs et investisseurs en temps réel."
                stat="API Disponible"
                color="red"
                navigate={navigate}
                target="ressources"
            />
        </div>
      </div>
    </section>

    {/* --- STATS STRIP "TICKER" --- */}
    <section className="bg-gray-900 text-white py-12 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-800">
                <StatItem label="Population" value="5.8M" trend="+2.4%" />
                <StatItem label="Projets Actifs" value="14" color="text-yellow-400" />
                <StatItem label="Publications" value="340+" />
                <StatItem label="Année Ref." value="2024" color="text-emerald-400" />
            </div>
        </div>
    </section>
  </div>
);

/* -------------------------------------------------------------------------- */
/*                                PAGE DONNÉES (Dummy)                        */
/* -------------------------------------------------------------------------- */
const DataPage = () => (
    <div className="container mx-auto px-4 py-12 animate-in slide-in-from-bottom-8 duration-500">
        <div className="bg-emerald-900 text-white rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-30"></div>
            <h2 className="text-3xl font-bold mb-4">Catalogue de Données</h2>
            <p className="text-emerald-100 max-w-2xl">
                Accédez aux indicateurs macroéconomiques, sociaux et démographiques. Données mises à jour par l'INS.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Comptes Nationaux', 'Prix (IPC)', 'Commerce Extérieur', 'Démographie', 'Santé', 'Éducation', 'Agriculture', 'Emploi'].map((cat, idx) => (
                <div key={idx} className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-lg transition cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-gray-50 p-3 rounded-lg group-hover:bg-emerald-50 transition">
                            <PieChart size={20} className="text-gray-400 group-hover:text-emerald-600" />
                        </div>
                        <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-500">CSV</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{cat}</h3>
                    <p className="text-sm text-gray-500">Indicateurs clés et séries temporelles.</p>
                </div>
            ))}
        </div>
    </div>
);

/* -------------------------------------------------------------------------- */
/*                                PAGE PROJETS                                */
/* -------------------------------------------------------------------------- */
const ProjectsPage = () => (
    <div className="container mx-auto px-4 py-12 animate-in slide-in-from-bottom-8 duration-500">
        <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Suivi des Opérations</h2>
            <p className="text-gray-500">État d'avancement des grands chantiers statistiques nationaux financés par HISWACA.</p>
        </div>

        <div className="space-y-6">
            <ProjectRow 
                title="RGPH-5 (Recensement Général)" 
                desc="Cartographie numérique et dénombrement de la population."
                progress={65}
                status="En cours"
                statusColor="bg-emerald-100 text-emerald-800"
            />
            <ProjectRow 
                title="Enquête Harmonisée Conditions de Vie" 
                desc="Collecte de données sur la pauvreté et les ménages."
                progress={30}
                status="Démarrage"
                statusColor="bg-yellow-100 text-yellow-800"
            />
             <ProjectRow 
                title="Modernisation Data Center" 
                desc="Construction de l'infrastructure serveur à Brazzaville."
                progress={90}
                status="Finalisation"
                statusColor="bg-blue-100 text-blue-800"
            />
        </div>
    </div>
);

/* -------------------------------------------------------------------------- */
/*                                PAGE RESSOURCES                             */
/* -------------------------------------------------------------------------- */
const ResourcesPage = () => (
    <div className="container mx-auto px-4 py-12 animate-in slide-in-from-bottom-8 duration-500">
         <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Bibliothèque Numérique</h2>
                <p className="text-gray-500 mt-2">Rapports, méthodologies et textes légaux.</p>
            </div>
            <div className="mt-4 md:mt-0 w-full md:w-auto">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" placeholder="Rechercher..." className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500"/>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                    <tr>
                        <th className="p-4 font-medium">Document</th>
                        <th className="p-4 font-medium hidden md:table-cell">Catégorie</th>
                        <th className="p-4 font-medium hidden md:table-cell">Date</th>
                        <th className="p-4 font-medium text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {[
                        {name: "Annuaire Statistique National 2024", cat: "Rapport", date: "Oct 2024"},
                        {name: "Méthodologie RGPH-5", cat: "Technique", date: "Sept 2024"},
                        {name: "Stratégie Nationale de Développement de la Statistique", cat: "Stratégie", date: "Juin 2023"},
                        {name: "Note de conjoncture économique T3", cat: "Bulletin", date: "Nov 2024"},
                    ].map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition group">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-red-50 text-red-600 p-2 rounded"><FileText size={18}/></div>
                                    <span className="font-medium text-gray-800">{row.name}</span>
                                </div>
                            </td>
                            <td className="p-4 text-sm text-gray-500 hidden md:table-cell"><span className="bg-gray-100 px-2 py-1 rounded">{row.cat}</span></td>
                            <td className="p-4 text-sm text-gray-500 hidden md:table-cell">{row.date}</td>
                            <td className="p-4 text-right">
                                <button className="text-gray-400 hover:text-emerald-600 transition"><Download size={20}/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

/* -------------------------------------------------------------------------- */
/*                            COMPOSANTS UTILITAIRES                          */
/* -------------------------------------------------------------------------- */

// Carte "Style Dossier" avec onglet et interaction
const FeatureCard = ({ icon, title, desc, stat, color, navigate, target }) => {
    const colorClasses = {
        emerald: "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white border-emerald-200",
        yellow: "bg-yellow-100 text-yellow-700 group-hover:bg-yellow-500 group-hover:text-white border-yellow-200",
        red: "bg-red-100 text-red-700 group-hover:bg-red-600 group-hover:text-white border-red-200",
    };

    return (
        <div 
            onClick={() => navigate(target)}
            className="group relative bg-white rounded-xl border border-gray-200 p-6 pt-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
        >
            {/* Petit Onglet en haut */}
            <div className={`absolute top-0 left-6 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-b-md ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]}`}>
                Priorité
            </div>

            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300 ${colorClasses[color]}`}>
                {icon}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">{desc}</p>
            
            {/* Section Stats "Data" en bas de carte */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs font-bold text-gray-400 uppercase">Indicateur</div>
                <div className="flex items-center gap-2 font-bold text-gray-800">
                    <TrendingUp size={16} className={color === 'red' ? 'text-red-500' : color === 'yellow' ? 'text-yellow-500' : 'text-emerald-500'} />
                    {stat}
                </div>
            </div>
        </div>
    );
};

const StatItem = ({ label, value, trend, color = "text-white" }) => (
    <div className="flex flex-col items-center justify-center p-4">
        <div className={`text-3xl md:text-4xl font-bold mb-1 ${color}`}>{value}</div>
        <div className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">{label}</div>
        {trend && <div className="text-xs text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded-full">{trend}</div>}
    </div>
);

const ProjectRow = ({ title, desc, progress, status, statusColor }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition flex flex-col md:flex-row items-center gap-6">
        <div className="p-3 bg-gray-50 rounded-full border border-gray-100">
            <Calendar className="text-gray-400" size={24} />
        </div>
        <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-gray-900">{title}</h3>
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full w-fit mx-auto md:mx-0 ${statusColor}`}>{status}</span>
            </div>
            <p className="text-sm text-gray-500">{desc}</p>
        </div>
        <div className="w-full md:w-1/3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Avancement</span>
                <span className="font-bold">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{width: `${progress}%`}}></div>
            </div>
        </div>
    </div>
);

export default App;