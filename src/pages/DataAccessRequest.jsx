import React, { useState } from 'react';
import { UploadCloud, Check, ChevronRight, ChevronLeft, Building2, FileText, ShieldAlert, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const DataAccessRequest = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // State global du formulaire
  const [formData, setFormData] = useState({
    // Etape 1 : Contact
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    // Etape 2 : Structure
    org_name: '',
    org_type: 'Public', // Public, Privé, ONG, Recherche
    org_address: '',
    // Etape 3 : Motivation
    request_reason: '',
    data_scope: [], // Quelles données ?
    // Etape 4 : Documents (Fichiers)
    official_letter: null,
    id_card: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, fieldName) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [fieldName]: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();
    // Conversion de l'objet en FormData pour l'envoi de fichiers
    Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
    });

    try {
        // Endpoint Django suggéré : /api/requests/submit/
        await api.post('/requests/submit/', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        setStep(5); // Vers l'écran de succès
    } catch (error) {
        console.error("Erreur soumission", error);
        alert("Erreur lors de l'envoi. Vérifiez la taille des fichiers.");
    } finally {
        setLoading(false);
    }
  };

  // Composants visuels pour les étapes
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 pt-24">
      <div className="max-w-3xl mx-auto">
        
        {/* Barre de progression */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Demande d'Accès aux Micro-données</h1>
            <p className="text-center text-gray-500 mb-8">Formulaire accréditation pour les institutions partenaires.</p>
            
            <div className="flex justify-between items-center relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 -z-10 transition-all duration-500`} style={{width: `${(step - 1) * 33}%`}}></div>
                {[1, 2, 3, 4].map((num) => (
                    <div key={num} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-colors ${
                        step >= num ? 'bg-emerald-600 text-white border-emerald-100' : 'bg-white text-gray-400 border-gray-200'
                    }`}>
                        {step > num ? <Check size={16}/> : num}
                    </div>
                ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2 font-bold uppercase">
                <span>Contact</span>
                <span>Structure</span>
                <span>Motivation</span>
                <span>Documents</span>
            </div>
        </div>

        {/* Contenu du Formulaire */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 min-h-[400px]">
            
            {/* ETAPE 1 : CONTACT */}
            {step === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Building2 className="text-emerald-600"/> Information du Demandeur</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Nom complet</label>
                            <input name="contact_name" value={formData.contact_name} onChange={handleChange} type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Dr. Jean Malonga"/>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Email Professionnel</label>
                            <input name="contact_email" value={formData.contact_email} onChange={handleChange} type="email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="jean@oms.org"/>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-1">Téléphone</label>
                            <input name="contact_phone" value={formData.contact_phone} onChange={handleChange} type="tel" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="+242 06 ..."/>
                        </div>
                    </div>
                </div>
            )}

            {/* ETAPE 2 : STRUCTURE */}
            {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                     <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Building2 className="text-emerald-600"/> Identité de la Structure</h3>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Nom de l'organisation</label>
                        <input name="org_name" value={formData.org_name} onChange={handleChange} type="text" className="w-full p-3 border rounded-lg" placeholder="Ministère de la Santé"/>
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Type de structure</label>
                        <select name="org_type" value={formData.org_type} onChange={handleChange} className="w-full p-3 border rounded-lg bg-white">
                            <option value="Public">Administration Publique</option>
                            <option value="ONG">ONG Internationale / Nationale</option>
                            <option value="Recherche">Institut de Recherche / Université</option>
                            <option value="Prive">Secteur Privé</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Adresse physique (Siège)</label>
                        <input name="org_address" value={formData.org_address} onChange={handleChange} type="text" className="w-full p-3 border rounded-lg" placeholder="Brazzaville, Centre-ville..."/>
                     </div>
                </div>
            )}

            {/* ETAPE 3 : MOTIVATION */}
            {step === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                     <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><FileText className="text-emerald-600"/> Usage des données</h3>
                     <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 border border-blue-100 mb-4">
                        <ShieldAlert size={16} className="inline mr-2"/>
                        Conformément à la loi statistique, l'usage des données est strictement limité aux objectifs déclarés.
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Pourquoi avez-vous besoin de ces données ?</label>
                        <textarea name="request_reason" value={formData.request_reason} onChange={handleChange} className="w-full p-3 border rounded-lg h-32" placeholder="Description du projet d'étude, analyse d'impact..."></textarea>
                     </div>
                </div>
            )}

            {/* ETAPE 4 : DOCUMENTS */}
            {step === 4 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><UploadCloud className="text-emerald-600"/> Pièces Justificatives</h3>
                    
                    {/* Upload Lettre */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition relative">
                        <input type="file" onChange={(e) => handleFileChange(e, 'official_letter')} accept=".pdf,.jpg" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                        <FileText className="mx-auto text-gray-400 mb-2" size={32}/>
                        <div className="font-bold text-gray-700">Lettre de demande officielle</div>
                        <div className="text-sm text-gray-500">{formData.official_letter ? formData.official_letter.name : "Glissez un fichier PDF ou cliquez (Max 5Mo)"}</div>
                    </div>

                    {/* Upload ID */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition relative">
                        <input type="file" onChange={(e) => handleFileChange(e, 'id_card')} accept=".pdf,.jpg" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                        <div className="font-bold text-gray-700">Pièce d'identité du demandeur</div>
                        <div className="text-sm text-gray-500">{formData.id_card ? formData.id_card.name : "Carte d'identité ou Passeport"}</div>
                    </div>
                </div>
            )}

            {/* ECRAN SUCCES */}
            {step === 5 && (
                <div className="text-center py-12 animate-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Demande envoyée avec succès !</h2>
                    <p className="text-gray-500 max-w-md mx-auto mb-8">
                        Votre dossier a été transmis à l'équipe HISWACA. Vous recevrez une réponse par email sous 48 à 72h.
                        <br/>En cas d'acceptation, vos identifiants d'accès vous seront envoyés.
                    </p>
                    <button onClick={() => navigate('/')} className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold">Retour à l'accueil</button>
                </div>
            )}

            {/* Navigation Steps */}
            {step < 5 && (
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                    <button 
                        onClick={() => setStep(s => s - 1)} 
                        disabled={step === 1}
                        className={`flex items-center px-4 py-2 rounded-lg font-bold ${step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <ChevronLeft size={20} className="mr-1"/> Précédent
                    </button>

                    {step < 4 ? (
                        <button 
                            onClick={() => setStep(s => s + 1)} 
                            className="bg-emerald-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-900 flex items-center"
                        >
                            Suivant <ChevronRight size={20} className="ml-1"/>
                        </button>
                    ) : (
                        <button 
                            onClick={handleSubmit} 
                            disabled={loading}
                            className="bg-emerald-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-emerald-700 flex items-center shadow-lg shadow-emerald-200"
                        >
                            {loading ? <Loader2 className="animate-spin mr-2"/> : "Soumettre le dossier"}
                        </button>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DataAccessRequest;