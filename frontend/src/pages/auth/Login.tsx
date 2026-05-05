import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { useAuthStore } from '../../lib/auth';
import {
  User, Lock, Eye, EyeOff,
  Phone, Mail, MapPin,
  Users, Loader2, ArrowLeft, ArrowRight, Globe,
  ShieldCheck,
  Waves
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useLang } from '../../context/LangContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const { t, lang, setLang } = useLang();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { email: email.trim(), password });
      const { user, access_token } = res.data;
      setAuth(user, access_token, rememberMe);
      toast.success(t('loginSuccess'));

      if (['rh', 'rh_admin', 'admin', 'doctor', 'nurse', 'veterinarian'].includes(user.role)) {
        navigate('/dashboard');
      } else if (user.role === 'candidat') {
        navigate('/portail/candidat');
      } else {
        navigate('/portail/fonctionnaire');
      }

    } catch (err: any) {
      const msg = err.response?.data?.error || t('loginError');
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#f3f4f6] flex flex-col font-sans overflow-x-hidden ${lang === 'ar' ? 'font-arabic' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      <main className="flex-1 flex flex-col lg:flex-row">
        
        {/* Left Side: Brand Imagery */}
        <div className="lg:w-[45%] relative hidden lg:block overflow-hidden">
          <img
            src="/larache_login_bg.jpg"
            alt="Larache Coastal View"
            className="absolute inset-0 w-full h-full object-cover shadow-2xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200';
            }}
          />
          
          {/* Main Overlay Box */}
          <div className="absolute inset-0 flex items-center justify-center px-12">
            <div className="bg-[#1e293b]/60 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 text-center max-w-md shadow-2xl">
              <h2 className="text-white text-4xl font-black mb-4 leading-tight">
                {t('loginPageTitle')}
              </h2>
              <p className="text-blue-100 text-lg font-bold opacity-90 leading-relaxed">
                {t('loginPageSubtitle')}
              </p>
            </div>
          </div>

          {/* Bottom Logo Card */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-xs">
            <div className="bg-white rounded-3xl p-5 shadow-2xl border border-gray-100 flex items-center gap-4">
              <div className="w-14 h-14 shrink-0 overflow-hidden">
                <img src="/logo_commune.jpg" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#002352] font-black text-sm uppercase leading-tight">{t('communeName')}</span>
                <span className="text-yellow-600 font-bold text-xs tracking-[0.2em] uppercase">{t('communeCity')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative">
          
          {/* Header Buttons */}
          <div className={`absolute top-8 ${lang === 'ar' ? 'left-8' : 'right-8'} flex items-center gap-3`}>
            <button 
              onClick={() => setLang(lang === 'ar' ? 'fr' : 'ar')}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm"
            >
              <Globe size={16} />
              <span>{lang === 'ar' ? 'Français' : 'العربية'}</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm"
            >
              {lang === 'ar' ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
              {t('backToHome')}
            </button>
          </div>

          {/* The Login Card */}
          <div className="w-full max-w-[540px] bg-white rounded-[3rem] shadow-[0_20px_70px_rgba(0,0,0,0.06)] p-10 md:p-14 lg:p-16 border border-gray-50 flex flex-col items-center animate-fade-in">
            
            {/* Custom Larache Illustration Icon */}
            <div className="w-24 h-24 mb-6 flex items-center justify-center text-[#002352]">
               <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                 {/* The Fort / Lighthouse */}
                 <path d="M10 18v-8l2-2 2 2v8M8 18h8M9 10h6M11 6h2M12 4v2" />
                 {/* The Waves */}
                 <path d="M4 18c2 0 3-1 4-1s2 1 4 1 3-1 4-1 2 1 4 1" />
                 <path d="M4 21c2 0 3-1 4-1s2 1 4 1 3-1 4-1 2 1 4 1" />
                 {/* The Birds */}
                 <path d="M17 5c1 0 1.5.5 2 1-.5.5-1 1-2 1M6 7c.5 0 1 .5 1.5 1-.5.5-1 1-1.5 1" />
               </svg>
            </div>

            <h3 className="text-4xl font-black text-[#002352] mb-3">{t('loginTitle')}</h3>
            <p className="text-gray-400 font-bold text-sm mb-12">{t('loginSubtitle')}</p>

            <form onSubmit={handleSubmit} className="w-full space-y-7">
              {/* Username Field */}
              <div className="space-y-2.5">
                <label className="text-[13px] font-black text-[#002352] block px-1">{t('usernameOrEmail')}</label>
                <div className="relative">
                  <div className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-300`}>
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder={t('usernameOrEmailPlaceholder')}
                    className={`w-full ${lang === 'ar' ? 'pr-12' : 'pl-12'} h-14 bg-white border-gray-200 focus:border-[#002352] focus:ring-1 focus:ring-[#002352]/20 rounded-2xl text-gray-700 font-medium transition-all placeholder:text-gray-300`}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2.5">
                <label className="text-[13px] font-black text-[#002352] block px-1">{t('passwordLabel')}</label>
                <div className="relative">
                  <div className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-300`}>
                    <Lock size={20} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${lang === 'ar' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors`}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder={t('passwordPlaceholder')}
                    className={`w-full ${lang === 'ar' ? 'pr-12' : 'pl-12'} h-14 bg-white border-gray-200 focus:border-[#002352] focus:ring-1 focus:ring-[#002352]/20 rounded-2xl text-gray-700 font-medium transition-all placeholder:text-gray-300`}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center px-1 pt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#002352] focus:ring-[#002352] cursor-pointer"
                  />
                  <label htmlFor="remember" className="text-[13px] font-bold text-gray-600 cursor-pointer">{t('rememberMe')}</label>
                </div>
                <Link to="/forgot-password" onClick={(e) => e.preventDefault()} className="text-[13px] font-bold text-[#002352] hover:underline">{t('forgotPassword')}</Link>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-[#002352] hover:bg-[#001a3d] text-white rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-[#002352]/20 active:scale-[0.98] transition-all text-base font-black mt-4"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : (
                  <>
                    <span>{t('loginTitle')}</span>
                    <Lock size={18} />
                  </>
                )}
              </button>

              <div className="relative flex items-center justify-center py-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <span className="relative px-4 bg-white text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('orLoginWith')}</span>
              </div>

              <button
                type="button"
                onClick={() => navigate('/candidat-login')}
                className="w-full h-14 bg-white border border-gray-200 text-[#002352] rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all font-bold text-base shadow-sm group"
              >
                <span>{t('candidateSpace')}</span>
                <Users size={20} className="text-[#002352]/60 group-hover:text-[#002352] transition-colors" />
              </button>
            </form>

            <div className="mt-12 text-center">
              <p className="text-[13px] font-bold text-gray-400">
                {t('noAccount')} <Link to="/contact" className="text-[#002352] hover:underline ml-1">{t('contactAdmin')}</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Modern Compact Footer */}
      <footer className="bg-[#001a3d] text-white py-8 px-6 md:px-16 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><Phone size={14} className="text-blue-300" /></div>
              <span dir="ltr" className="text-xs font-bold opacity-80">+212 5 39 91 23 45</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><Mail size={14} className="text-blue-300" /></div>
              <span className="text-xs font-bold opacity-80">contact@larache.ma</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><MapPin size={14} className="text-blue-300" /></div>
              <span className="text-xs font-bold opacity-80">Avenue Mohammed V, Larache</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
             <div className="mb-2">
                <img src="/logo_commune.jpg" alt="Larache" className="h-10 grayscale brightness-200 opacity-30" />
             </div>
             <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] text-center md:text-right">
                {t('allRightsReserved')}
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
