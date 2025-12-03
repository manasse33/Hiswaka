import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, FileText, Navigation, 
  CheckCircle, AlertCircle, Copy, Flag, X, ChevronDown, ChevronUp
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { isOpenNow } from '../utils/timeFormat';
import ReportModal from './ReportModal';

export default function AdminDetail({ admin, onClose, onGetDirections, onReport }) {
  const { t } = useTranslation();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!admin) return null;

  const open = isOpenNow(admin.opening_hours);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${admin.street_address}, ${admin.quartier}, ${admin.city}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCall = () => {
    if (admin.phone) {
      window.location.href = `tel:${admin.phone}`;
    }
  };

  const services = admin.services || [];
  const displayedServices = showAllServices ? services : services.slice(0, 5);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slide-in-right">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-[#26aa7e] to-[#1f8865] text-white p-6 rounded-t-2xl z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur-md rounded-full">
                    {t(`admin.types.${admin.type}`)}
                  </span>
                  {admin.verified && (
                    <span className="inline-flex items-center gap-1 badge-success">
                      <CheckCircle size={14} />
                      {t('detail.verified')}
                    </span>
                  )}
                  {!admin.verified && (
                    <span className="inline-flex items-center gap-1 badge-warning">
                      <AlertCircle size={14} />
                      {t('detail.notVerified')}
                    </span>
                  )}
                </div>
                <h2 className="text-3xl font-bold mb-2">{admin.name}</h2>
                <p className="text-white/90 flex items-center gap-2">
                  <MapPin size={16} />
                  {admin.street_address}, {admin.quartier}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Boutons d'action principaux */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              <button
                onClick={onGetDirections}
                className="btn-secondary bg-white/10 border-white/30 text-white hover:bg-white hover:text-[#26aa7e] text-sm py-3"
              >
                <Navigation size={18} className="mx-auto mb-1" />
                Itinéraire
              </button>
              <button
                onClick={handleCall}
                disabled={!admin.phone}
                className="btn-secondary bg-white/10 border-white/30 text-white hover:bg-white hover:text-[#26aa7e] text-sm py-3 disabled:opacity-50"
              >
                <Phone size={18} className="mx-auto mb-1" />
                Appeler
              </button>
              <button
                onClick={handleCopyAddress}
                className="btn-secondary bg-white/10 border-white/30 text-white hover:bg-white hover:text-[#26aa7e] text-sm py-3"
              >
                {copied ? <CheckCircle size={18} className="mx-auto mb-1" /> : <Copy size={18} className="mx-auto mb-1" />}
                {copied ? 'Copié!' : 'Copier'}
              </button>
              <button
                onClick={() => setShowReportModal(true)}
                className="btn-secondary bg-white/10 border-white/30 text-white hover:bg-white hover:text-[#e74c3c] text-sm py-3"
              >
                <Flag size={18} className="mx-auto mb-1" />
                Signaler
              </button>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-6 space-y-6">
            {/* Horaires */}
            {admin.opening_hours && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#212529] flex items-center gap-2">
                  <Clock size={20} className="text-[#26aa7e]" />
                  {t('detail.hours')}
                </h3>
                <div className="glass p-4 rounded-xl space-y-2">
                  {Object.entries(admin.opening_hours).map(([day, hours]) => {
                    const dayNames = {
                      mon: 'Lundi', tue: 'Mardi', wed: 'Mercredi',
                      thu: 'Jeudi', fri: 'Vendredi', sat: 'Samedi', sun: 'Dimanche'
                    };
                    return (
                      <div key={day} className="flex justify-between text-sm">
                        <span className="font-semibold text-[#495057]">{dayNames[day]}</span>
                        <span className="text-[#6c757d]">{hours || 'Fermé'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Contact */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#212529] flex items-center gap-2">
                <Phone size={20} className="text-[#26aa7e]" />
                Contact
              </h3>
              <div className="space-y-2">
                {admin.phone && (
                  <a href={`tel:${admin.phone}`} className="flex items-center gap-3 p-3 glass rounded-xl hover:bg-[#26aa7e]/10 transition-colors">
                    <Phone size={18} className="text-[#26aa7e]" />
                    <span className="font-medium">{admin.phone}</span>
                  </a>
                )}
                {admin.email && (
                  <a href={`mailto:${admin.email}`} className="flex items-center gap-3 p-3 glass rounded-xl hover:bg-[#26aa7e]/10 transition-colors">
                    <Mail size={18} className="text-[#26aa7e]" />
                    <span className="font-medium">{admin.email}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Services */}
            {services.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#212529] flex items-center gap-2">
                  <FileText size={20} className="text-[#26aa7e]" />
                  {t('detail.services')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {displayedServices.map((service, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 glass rounded-lg">
                      <CheckCircle size={16} className="text-[#28a745] flex-shrink-0" />
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
                {services.length > 5 && (
                  <button
                    onClick={() => setShowAllServices(!showAllServices)}
                    className="text-[#26aa7e] font-semibold text-sm flex items-center gap-1 hover:underline"
                  >
                    {showAllServices ? (
                      <>Voir moins <ChevronUp size={16} /></>
                    ) : (
                      <>Voir tout ({services.length - 5} de plus) <ChevronDown size={16} /></>
                    )}
                  </button>
                )}
              </div>
            )}

            {/* Description */}
            {admin.description && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#212529]">
                  {t('detail.description')}
                </h3>
                <p className="text-[#495057] leading-relaxed glass p-4 rounded-xl">
                  {admin.description}
                </p>
              </div>
            )}

            {/* Documents requis */}
            {admin.required_documents && Object.keys(admin.required_documents).length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#212529] flex items-center gap-2">
                  <FileText size={20} className="text-[#26aa7e]" />
                  {t('detail.documents')}
                </h3>
                <div className="space-y-2">
                  {Object.entries(admin.required_documents).map(([service, docs]) => (
                    <div key={service} className="glass p-4 rounded-xl">
                      <p className="font-semibold text-[#26aa7e] mb-2">{service}</p>
                      <ul className="list-disc list-inside text-sm text-[#495057] space-y-1">
                        {docs.map((doc, index) => (
                          <li key={index}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Source */}
            {admin.source && (
              <p className="text-xs text-[#6c757d] text-center pt-4 border-t border-[#e9ecef]">
                {t('detail.source')}: {admin.source}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal de signalement */}
      {showReportModal && (
        <ReportModal
          admin={admin}
          onClose={() => setShowReportModal(false)}
          onSubmit={onReport}
        />
      )}
    </>
  );
}