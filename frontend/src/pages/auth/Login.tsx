import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../lib/auth';
import { 
  User, Lock, Eye, EyeOff, 
  Phone, Mail, MapPin, 
  Users, Loader2, ArrowRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', { email, password });
      const { user, access_token } = res.data;
      setAuth(user, access_token, rememberMe);
      toast.success('تم تسجيل الدخول بنجاح');
      
      if (['rh', 'admin', 'doctor', 'nurse', 'veterinarian'].includes(user.role)) {
        navigate('/dashboard');
      } else if (user.role === 'candidat') {
        navigate('/portail/candidat');
      } else {
        navigate('/portail/fonctionnaire');
      }

    } catch (err: any) {
      const msg = err.response?.data?.error || 'خطأ في المصادقة';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden relative" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-8 right-8 z-50 flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold hover:bg-white hover:text-[#0d5e3f] transition-all shadow-lg group"
      >
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        الرجوع للخلف
      </button>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row">
        
        {/* Left Side: Illustration */}
        <div className="lg:w-[46.5%] relative min-h-[400px] lg:min-h-0">
          <img 
            src="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=1200" 
            alt="Commune Building" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center p-8">
            <div className="bg-black/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <h2 className="text-4xl font-black mb-4 leading-tight">
                منصة الجماعة الترابية
              </h2>
              <p className="text-xl font-bold opacity-90 leading-relaxed">
                خدمات إلكترونية حديثة وآمنة في خدمتكم
              </p>
            </div>
            
            <div className="mt-12">
               <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-2 w-64 border-b-4 border-[#facc15]">
                  <div className="text-[#0d5e3f] font-black text-lg">الجماعة الترابية</div>
                  <div className="text-gray-400 font-bold text-xs uppercase tracking-widest">مدينة المستقبل</div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-[53.5%] bg-gray-50/50 flex items-center justify-center p-6 md:p-12 lg:p-16">
          <div className="w-full max-w-[580px] bg-white rounded-[2rem] shadow-[0_15px_60px_rgba(0,0,0,0.04)] p-8 md:p-16 border border-gray-100 flex flex-col items-center">
            
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-8 text-gray-500 shadow-inner">
              <User size={40} strokeWidth={1.5} />
            </div>

            <div className="text-center mb-10 w-full">
              <h3 className="text-3xl font-black text-[#0d5e3f] mb-3">تسجيل الدخول</h3>
              <p className="text-gray-500 font-bold text-sm">المرجو إدخال بيانات الدخول الخاصة بك</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 block pr-1">الاسم المستخدم أو البريد الإلكتروني</label>
                <div className="relative">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 border-l border-gray-100 pl-4">
                    <User size={20} />
                  </div>
                  <input 
                    type="text" 
                    required 
                    placeholder="أدخل اسم المستخدم أو البريد الإلكتروني"
                    className="form-input w-full pr-16 h-16 bg-white border-gray-200 focus:border-[#0d5e3f] focus:ring-0 rounded-2xl text-right text-gray-700 font-bold transition-all"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 block pr-1">كلمة المرور</label>
                <div className="relative">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 border-l border-gray-100 pl-4">
                    <Lock size={20} />
                  </div>
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required 
                    placeholder="أدخل كلمة المرور"
                    className="form-input w-full pr-16 pl-14 h-16 bg-white border-gray-200 focus:border-[#0d5e3f] focus:ring-0 rounded-2xl text-right text-gray-700 font-bold transition-all"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-[#0d5e3f] focus:ring-[#0d5e3f] cursor-pointer" 
                  />
                  <label htmlFor="remember" className="text-sm font-bold text-gray-700 cursor-pointer">تذكرني</label>
                </div>
                <Link to="/forgot-password" className="text-sm font-bold text-[#0d5e3f] hover:underline transition-all">نسيت كلمة المرور؟</Link>
              </div>

              {error && (
                <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-bold flex items-center gap-3">
                   <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                   {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-16 bg-[#0d5e3f] hover:bg-[#0a4d33] text-white rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-[#0d5e3f]/20 active:scale-[0.98] transition-all text-lg font-black"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : (
                  <>
                    <span>تسجيل الدخول</span>
                    <Lock size={20} className="mr-1" />
                  </>
                )}
              </button>

              <div className="relative flex items-center justify-center py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <span className="relative px-6 bg-white text-[10px] font-black text-gray-500 uppercase tracking-widest">أو الدخول باستخدام</span>
              </div>

              <button 
                type="button"
                className="w-full h-16 bg-white border border-gray-200 text-gray-700 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-sm shadow-sm"
              >
                <span>الدخول عبر الحساب الإداري الموحد</span>
                <Users size={22} className="text-blue-500 mr-1" />
              </button>
            </form>

            <div className="mt-12 flex items-center gap-3 text-sm">
               <span className="font-bold text-gray-500">ليس لديك حساب؟</span>
               <Link to="/contact" className="font-bold text-gray-700 hover:text-[#0d5e3f] hover:underline">اتصل بالمسؤول الإداري</Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0d5e3f] text-white py-6 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold border-t border-white/10">
        <div className="flex flex-wrap justify-center gap-10">
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-[#facc15]" />
            <span dir="ltr" className="text-sm">+212 5 37 23 45 67</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-[#facc15]" />
            <span className="text-sm">contact@commune.ma</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-[#facc15]" />
            <span className="text-sm">شارع محمد الخامس، المدينة، المغرب</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>
           <p className="opacity-70 uppercase tracking-widest text-[10px]">
             جميع الحقوق محفوظة © 2024 الجماعة الترابية
           </p>
        </div>
      </footer>
    </div>
  );
}
