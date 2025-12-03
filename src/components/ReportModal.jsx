import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ReportModal({ admin, onClose, onSubmit }) {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message) return;
    setLoading(true);
    try {
      await onSubmit(admin.id, { message, user_contact: contact });
      onClose();
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#212529]">{t('report.title')}</h3>
          <button onClick={onClose} className="p-2 hover:bg-[#f8f9fa] rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#495057] mb-2">
              {t('report.message')}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border-2 border-[#e9ecef] rounded-xl focus:border-[#26aa7e] focus:outline-none transition-all resize-none"
              placeholder="Décrivez le problème..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#495057] mb-2">
              {t('report.contact')}
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#e9ecef] rounded-xl focus:border-[#26aa7e] focus:outline-none transition-all"
              placeholder="Email ou téléphone (optionnel)"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-[#e9ecef] rounded-xl font-semibold hover:bg-[#f8f9fa] transition-all"
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !message}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {loading ? t('common.loading') : t('report.submit')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}