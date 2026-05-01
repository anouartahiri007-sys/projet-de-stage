import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, ArrowRight, Loader2, Mail, BadgeCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { api } from '../../lib/api';
import { useAuthStore } from '../../lib/auth';

export default function CandidatLogin() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [codeCandidat, setCodeCandidat] = useState('');
  const [loading, setLoading] = useState(false);

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
      toast.success('تم تسجيل الدخول بنجاح');
      navigate('/portail/candidat');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'رمز المترشح غير صحيح');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/candidat-register', registerForm);
      toast.success('تم إنشاء الحساب! تحقق من بريدك الإلكتروني للحصول على الرمز');
      // For demo purposes, we will pre-fill the code so the user doesn't actually need to check their email
      setCodeCandidat(data.code_candidat);
      toast.success(`(Demo) الرمز الخاص بك هو: ${data.code_candidat}`, { duration: 10000 });
      setIsRegistering(false);
    } catch (err: any) {
      const errors = err.response?.data;
      if (errors && typeof errors === 'object') {
        const firstError = Object.values(errors)[0];
        toast.error(Array.isArray(firstError) ? firstError[0] : 'بيانات غير صالحة');
      } else {
        toast.error('خطأ أثناء إنشاء الحساب، المرجو التأكد من البيانات');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-hidden relative" dir="rtl">
      {/* Back Button */}
      <button
        onClick={() => navigate('/login')}
        className="absolute top-8 right-8 z-50 flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-700 border border-emerald-100 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-sm group"
      >
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        الرجوع
      </button>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[500px] bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">

          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-600 shadow-inner">
            <BadgeCheck size={40} strokeWidth={1.5} />
          </div>

          <div className="text-center mb-10 w-full">
            <h3 className="text-3xl font-black text-[#0d5e3f] mb-3">
              {isRegistering ? 'إنشاء حساب مترشح' : 'فضاء المترشح'}
            </h3>
            <p className="text-gray-500 font-bold text-sm">
              {isRegistering ? 'أدخل معلوماتك للتسجيل في منصة التوظيف' : 'المرجو إدخال رمز المترشح الخاص بك'}
            </p>
          </div>

          {!isRegistering ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 block pr-1">Code Candidat (رمز المترشح)</label>
                <div className="relative">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 border-l border-gray-100 pl-4">
                    <Lock size={20} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="مثال: CAND-A1B2C3"
                    className="form-input w-full pr-16 h-14 bg-gray-50 border-gray-200 focus:border-[#0d5e3f] focus:ring-0 rounded-2xl text-right text-gray-700 font-bold transition-all"
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
                {loading ? <Loader2 className="animate-spin" size={24} /> : 'Se connecter (تسجيل الدخول)'}
              </button>

              <div className="mt-8 text-center text-sm font-bold text-gray-500">
                ليس لديك حساب؟{' '}
                <button type="button" onClick={() => setIsRegistering(true)} className="text-emerald-600 hover:underline">
                  Créer un compte candidat (إنشاء حساب)
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700">الاسم الشخصي</label>
                  <input
                    type="text" required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:border-[#0d5e3f] outline-none"
                    value={registerForm.first_name} onChange={e => setRegisterForm({ ...registerForm, first_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700">الاسم العائلي</label>
                  <input
                    type="text" required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:border-[#0d5e3f] outline-none"
                    value={registerForm.last_name} onChange={e => setRegisterForm({ ...registerForm, last_name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">رقم البطاقة الوطنية (CIN)</label>
                <input
                  type="text" required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:border-[#0d5e3f] outline-none"
                  value={registerForm.cin} onChange={e => setRegisterForm({ ...registerForm, cin: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">البريد الإلكتروني</label>
                <input
                  type="email" required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-left focus:border-[#0d5e3f] outline-none"
                  value={registerForm.email} onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-[#0d5e3f] hover:bg-[#0a4d33] text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all text-lg font-black mt-6"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : 'تسجيل'}
              </button>

              <div className="mt-8 text-center text-sm font-bold text-gray-500">
                لديك حساب مسبقاً؟{' '}
                <button type="button" onClick={() => setIsRegistering(false)} className="text-emerald-600 hover:underline">
                  تسجيل الدخول
                </button>
              </div>
            </form>
          )}

        </div>
      </main>
    </div>
  );
}
