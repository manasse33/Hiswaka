import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(t('auth.loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#26aa7e] via-[#1f8865] to-[#18664c] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
            <MapPin size={40} className="text-[#ffc107]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AdminLocator CG</h1>
          <p className="text-white/80">Panneau d'administration</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-slide-in-right">
          <h2 className="text-2xl font-bold text-[#212529] mb-6 flex items-center gap-2">
            <LogIn size={28} className="text-[#26aa7e]" />
            {t('auth.login')}
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-[#fee] border border-[#fcc] rounded-xl text-[#e74c3c] text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#495057] mb-2">
                {t('auth.email')}
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6c757d]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#e9ecef] rounded-xl focus:border-[#26aa7e] focus:outline-none transition-all"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#495057] mb-2">
                {t('auth.password')}
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6c757d]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border-2 border-[#e9ecef] rounded-xl focus:border-[#26aa7e] focus:outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#6c757d] hover:text-[#26aa7e] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !email || !password}
              className="w-full btn-primary mt-6 disabled:opacity-50"
            >
              {loading ? t('common.loading') : t('auth.loginButton')}
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-white hover:text-[#ffc107] transition-colors font-medium">
            ← Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}