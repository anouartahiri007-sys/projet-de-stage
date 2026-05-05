import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../lib/auth';
import { Loader2, User, Mail, Lock, Shield, ArrowRight, ArrowLeft, Globe } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useLang } from '../../context/LangContext';

export default function Register() {
  const [role, setRole] = useState<'candidate' | 'fonctionnaire'>('candidate');
  const [formData, setFormData] = useState({ name: '', cin: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const { t, lang, setLang } = useLang();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:8000/api/auth/register', { ...formData, role });
      const { user, access_token } = res.data;
      if (access_token) setAuth(user, access_token);
      toast.success(t('registerSuccess'));
      navigate(role === 'candidate' ? '/portail/candidat' : '/dashboard');
    } catch (err: any) {
      setError(err.response?.data || t('registerError'));
      toast.error(t('registerError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-[90vh] flex items-center justify-center p-4 ${lang === 'ar' ? 'font-arabic' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Language Toggle */}
      <div className={`absolute top-8 ${lang === 'ar' ? 'left-8' : 'right-8'} z-50`}>
        <button 
          onClick={() => setLang(lang === 'ar' ? 'fr' : 'ar')}
          className="flex items-center gap-2 px-4 py-2.5 bg-white text-emerald-700 border border-emerald-100 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-sm"
        >
          <Globe size={18} />
          <span>{lang === 'ar' ? 'Français' : 'العربية'}</span>
        </button>
      </div>
      <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
        
        <div className="flex-1 p-8 md:p-12">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-black font-heading text-[#0d5e3f] dark:text-white tracking-tight">{t('registerTitle')}</h1>
            <p className="text-slate-400 mt-2 font-medium">{t('registerSubtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Role Selection */}
            <div className="bg-slate-50 p-2 rounded-2xl flex gap-2 border border-slate-100">
              <button 
                type="button"
                onClick={() => setRole('candidate')}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${role === 'candidate' ? 'bg-[#0d5e3f] text-white shadow-lg' : 'text-slate-400 hover:bg-white'}`}
              >
                {t('candidate')}
              </button>
              <button 
                type="button"
                onClick={() => setRole('fonctionnaire')}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${role === 'fonctionnaire' ? 'bg-[#1E3E6E] text-white shadow-lg' : 'text-slate-400 hover:bg-white'}`}
              >
                {t('agent')}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={`text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 block ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('cinMatricule')}</label>
                <div className="relative">
                  <Shield className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-300`} size={16} />
                  <input 
                    required 
                    className={`form-input w-full ${lang === 'ar' ? 'pr-10 text-right' : 'pl-10 text-left'}`} 
                    placeholder="Ex: AB12345"
                    value={formData.cin}
                    onChange={e => setFormData({...formData, cin: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className={`text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 block ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('fullName')}</label>
                <div className="relative">
                  <User className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-300`} size={16} />
                  <input 
                    required 
                    className={`form-input w-full ${lang === 'ar' ? 'pr-10 text-right' : 'pl-10 text-left'}`} 
                    placeholder={t('fullName')}
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 block ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('emailProPerso')}</label>
              <div className="relative">
                <Mail className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-300`} size={16} />
                <input 
                  type="email" 
                  required 
                  className={`form-input w-full ${lang === 'ar' ? 'pr-10 text-right' : 'pl-10 text-left'}`} 
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 block ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('password')}</label>
              <div className="relative">
                <Lock className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-300`} size={16} />
                <input 
                  type="password" 
                  required 
                  className={`form-input w-full ${lang === 'ar' ? 'pr-10 text-right' : 'pl-10 text-left'}`} 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {error && <p className="text-rose-500 text-xs font-bold text-center bg-rose-50 py-3 rounded-xl border border-rose-100">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 bg-[#0d5e3f] hover:bg-[#0a4d33] text-white rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/10 active:scale-[0.98] transition-all text-sm font-black uppercase tracking-widest"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  <span>{t('createAccount')}</span>
                  {lang === 'ar' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-bold text-slate-400">
            {t('alreadyRegistered')} <Link to="/login" className="text-blue-600 hover:underline">{t('loginHere')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
