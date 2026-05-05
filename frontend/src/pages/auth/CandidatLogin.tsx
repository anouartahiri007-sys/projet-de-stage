import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, Loader2, BadgeCheck, Globe } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { api } from '../../lib/api';
import { useAuthStore } from '../../lib/auth';
import { useLang } from '../../context/LangContext';

export default function CandidatLogin() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [codeCandidat, setCodeCandidat] = useState('');
  const [loading, setLoading] = useState(false);
  const { t, lang, setLang } = useLang();

  // Register Form State
  const [registerForm, setRegisterForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    cin: ''
  });

  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/candidat-login', { code_candidat: codeCandidat });
      setAuth(data.user, data.access_token, false);
      toast.success(t('loginSuccess'));
      navigate('/portail/candidat');
    } catch (err: any) {
      toast.error(err.response?.data?.error || t('loginError'));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/candidat-register', registerForm);
      toast.success(t('registerSuccess'));
      // For demo purposes, we will pre-fill the code so the user doesn't actually need to check their email
      setCodeCandidat(data.code_candidat);
      toast.success(`${t('demoCodePrefix')} ${data.code_candidat}`, { duration: 10000 });
      setIsRegistering(false);
    } catch (err: any) {
      const errors = err.response?.data;
      if (errors && typeof errors === 'object') {
        const firstError = Object.values(errors)[0];
        toast.error(Array.isArray(firstError) ? firstError[0] : t('invalidData'));
      } else {
        toast.error(t('registerError'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-hidden relative`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/login')}
        className={`absolute top-8 ${lang === 'ar' ? 'right-8' : 'left-8'} z-50 flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-700 border border-emerald-100 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-sm group`}
      >
        <ArrowRight size={20} className={`${lang === 'ar' ? 'group-hover:translate-x-1' : 'rotate-180 group-hover:-translate-x-1'} transition-transform`} />
        {t('back')}
      </button>

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

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[500px] bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">

          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-600 shadow-inner">
            <BadgeCheck size={40} strokeWidth={1.5} />
          </div>

          <div className={`text-center mb-10 w-full ${lang === 'ar' ? 'text-right md:text-center' : 'text-left md:text-center'}`}>
            <h3 className="text-3xl font-black text-[#0d5e3f] mb-3">
              {isRegistering ? t('createCandidateAccount') : t('candidatePortal')}
            </h3>
            <p className="text-gray-500 font-bold text-sm">
              {isRegistering ? t('candidateInfoDesc') : t('enterCandidateCode')}
            </p>
          </div>

          {!isRegistering ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3">
                <label className={`text-sm font-bold text-gray-700 block ${lang === 'ar' ? 'pr-1' : 'pl-1'}`}>{t('candidateCodeLabel')}</label>
                <div className="relative">
                  <div className={`absolute ${lang === 'ar' ? 'right-4 border-l pl-4' : 'left-4 border-r pr-4'} top-1/2 -translate-y-1/2 text-gray-300 border-gray-100`}>
                    <Lock size={20} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder={t('candidateCodePlaceholder')}
                    className={`form-input w-full ${lang === 'ar' ? 'pr-16 text-right' : 'pl-16 text-left'} h-14 bg-gray-50 border-gray-200 focus:border-[#0d5e3f] focus:ring-0 rounded-2xl text-gray-700 font-bold transition-all`}
                    value={codeCandidat}
                    onChange={e => setCodeCandidat(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-[#0d5e3f] hover:bg-[#0a4d33] text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all text-lg font-black mt-4"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : t('loginBtn')}
              </button>

              <div className="mt-8 text-center text-sm font-bold text-gray-500">
                {t('noAccount')}{' '}
                <button type="button" onClick={() => setIsRegistering(true)} className="text-emerald-600 hover:underline font-black">
                  {t('registerBtn')}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className={`space-y-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <label className="text-xs font-bold text-gray-700">{t('firstName')}</label>
                  <input
                    type="text" required
                    className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:border-[#0d5e3f] outline-none ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                    value={registerForm.first_name} onChange={e => setRegisterForm({ ...registerForm, first_name: e.target.value })}
                  />
                </div>
                <div className={`space-y-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <label className="text-xs font-bold text-gray-700">{t('lastName')}</label>
                  <input
                    type="text" required
                    className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:border-[#0d5e3f] outline-none ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                    value={registerForm.last_name} onChange={e => setRegisterForm({ ...registerForm, last_name: e.target.value })}
                  />
                </div>
              </div>

              <div className={`space-y-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <label className="text-xs font-bold text-gray-700">{t('cin')}</label>
                <input
                  type="text" required
                  className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:border-[#0d5e3f] outline-none ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                  value={registerForm.cin} onChange={e => setRegisterForm({ ...registerForm, cin: e.target.value })}
                />
              </div>

              <div className={`space-y-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <label className="text-xs font-bold text-gray-700">{t('email')}</label>
                <input
                  type="email" required
                  className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-left focus:border-[#0d5e3f] outline-none`}
                  value={registerForm.email} onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-[#0d5e3f] hover:bg-[#0a4d33] text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all text-lg font-black mt-6"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : t('registerBtn')}
              </button>

              <div className="mt-8 text-center text-sm font-bold text-gray-500">
                {t('hasAccount')}{' '}
                <button type="button" onClick={() => setIsRegistering(false)} className="text-emerald-600 hover:underline font-black">
                  {t('loginBtn')}
                </button>
              </div>
            </form>
          )}

        </div>
      </main>
    </div>
  );
}
