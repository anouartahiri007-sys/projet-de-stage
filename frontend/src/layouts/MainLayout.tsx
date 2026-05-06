import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, Users, UserPlus, Shield, Network,
  List, Briefcase, TrendingUp, Star, History,
  Route, DollarSign, Gift, ScrollText, Calendar,
  CalendarDays, CalendarCheck, FileText, FilePlus,
  Bell, BarChart3, Menu, ChevronDown,
  PawPrint, Activity, Syringe, AlertTriangle, User as UserIcon, LogOut,
  ClipboardList, Settings as SettingsIcon, Globe, ChevronLeft,
  LayoutDashboard, UserCircle, Search, Layers
} from 'lucide-react';
import { useAuthStore } from '../lib/auth';
import { useLang } from '../context/LangContext';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { lang, setLang, t } = useLang();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleLang = () => {
    setLang(lang === 'ar' ? 'fr' : 'ar');
  };

  // Modern Sidebar Structure - Categorized for Enterprise UX
  const navigation = [
    {
      group: t('overview') || 'نظرة عامة',
      items: [
        { title: t('dashboard'), icon: <LayoutDashboard size={20} />, path: '/dashboard' }
      ]
    },
    {
      group: t('talentManagement') || 'إدارة المواهب',
      items: [
        { title: t('employees'), icon: <Users size={20} />, path: '/rh/employees' },
        { title: t('addEmployee'), icon: <UserPlus size={20} />, path: '/rh/employees/add' },
      ]
    },
    {
      group: t('administrativeActs') || 'الإجراءات الإدارية',
      items: [
        { title: t('administrativeActs') || 'القرارات الإدارية', icon: <FileText size={20} />, path: '/rh/acts' },
        { title: t('careerPath'), icon: <Route size={20} />, path: '/rh/career-path' },
        { title: t('rolesPermissions'), icon: <Shield size={20} />, path: '/rh/roles' },
      ]
    },
    {
      group: t('intelReports') || 'الذكاء والتقارير',
      items: [
        { title: t('statistics'), icon: <BarChart3 size={20} />, path: '/rh/statistics' },
      ]
    },
    {
      group: t('operations') || 'العمليات',
      items: [
        { title: t('documents'), icon: <FileText size={20} />, path: '/rh/documents' },
        { title: t('systemHealth') || 'جودة النظام', icon: <Activity size={20} />, path: '/rh/system-health' },
      ]
    }
  ];

  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className={`flex h-screen bg-[#F8FAFC] text-gray-800 font-sans overflow-hidden ${lang === 'ar' ? 'font-arabic' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>

      {/* --- SIDEBAR --- */}
      <aside className={`bg-[#003366] text-white flex flex-col transition-all duration-700 z-30 flex-shrink-0 shadow-2xl relative overflow-hidden ${sidebarOpen ? 'w-80' : 'w-0 opacity-0'}`}>
        
        {/* Subtle Moroccan Pattern in Sidebar Background */}
        <div className="absolute inset-0 pattern-moroccan opacity-[0.03] pointer-events-none"></div>

        {/* Brand Section */}
        <div className="h-32 flex items-center px-8 gap-5 border-b border-white/5 relative z-10">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl p-1.5 transform hover:rotate-6 transition-transform">
            <img src="/logo_commune.jpg" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-black text-xl leading-tight tracking-tight">{t('communeName')}</h1>
            <h2 className="font-black text-sm leading-tight text-[#C5A059] opacity-90">{t('communeCity')}</h2>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-10 px-6 custom-scrollbar space-y-10 relative z-10">
          {navigation.map((group, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className={`text-[#C5A059] text-[10px] font-black uppercase tracking-[0.3em] px-4 opacity-40 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                 {group.group}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item, i) => {
                  const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                  return (
                    <li key={i}>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 group relative ${isActive
                          ? 'bg-gradient-to-r from-white/10 to-white/5 text-white shadow-lg border border-white/10'
                          : 'text-blue-100/40 hover:text-white hover:bg-white/5'
                          }`}
                      >
                        {isActive && (
                          <div className={`absolute top-0 bottom-0 ${lang === 'ar' ? 'right-0' : 'left-0'} w-1.5 bg-[#C5A059] rounded-full shadow-[0_0_15px_#C5A059]`}></div>
                        )}
                        <span className={`transition-transform duration-300 ${isActive ? 'text-[#C5A059] scale-110' : 'group-hover:text-[#C5A059]'}`}>
                          {item.icon}
                        </span>
                        <span className="relative z-10">{item.title}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col overflow-hidden relative">

        {/* Premium Header */}
        <header className="h-28 bg-white/80 backdrop-blur-2xl border-b border-gray-100 px-12 flex items-center justify-between z-20 flex-shrink-0">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-4 bg-[#F8FAFC] text-slate-400 hover:text-[#003366] hover:bg-white hover:shadow-xl rounded-2xl transition-all border border-gray-50"
            >
              <Menu size={24} />
            </button>
            <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
              <h2 className="text-2xl font-black text-[#003366] tracking-tight">
                {t('welcome')}, <span className="text-[#006241]">{user?.name || 'سعاد الإدريسي'}</span>
              </h2>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">
                 {t('lastLogin') || 'آخر تسجيل دخول'}: {new Date().toLocaleTimeString()} • {new Date().toLocaleDateString(lang === 'ar' ? 'ar-MA' : 'fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-10">
            {/* Executive Search */}
            <div className="hidden xl:flex items-center bg-[#F8FAFC] border border-gray-100 rounded-2xl px-6 py-3 w-80 gap-3 group focus-within:border-[#C5A059] focus-within:bg-white focus-within:shadow-xl transition-all">
              <Search size={18} className="text-slate-300 group-focus-within:text-[#C5A059]" />
              <input type="text" placeholder={t('searchPlaceholder') || 'بحث سريع...'} className="bg-transparent border-none text-sm font-bold w-full focus:ring-0 placeholder:text-slate-300" />
            </div>

            {/* Language & Actions */}
            <div className="flex items-center gap-6">
              <button 
                onClick={toggleLang}
                className="flex items-center gap-3 text-[#003366] font-black text-[10px] uppercase tracking-widest bg-white px-6 py-3.5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all group"
              >
                <Globe size={16} className="text-[#C5A059] group-hover:rotate-180 transition-transform duration-700" />
                {lang === 'ar' ? 'Français' : 'العربية'}
              </button>

              <div className="flex items-center gap-6 border-l border-gray-100 pl-6">
                <button 
                  onClick={() => navigate('/rh/notifications')}
                  className="relative text-slate-400 hover:text-[#006241] transition-colors p-3 hover:bg-emerald-50 rounded-2xl"
                >
                  <Bell size={24} />
                  <span className="absolute top-2 right-2 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">3</span>
                </button>

                <div className="relative">
                  <div 
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-5 cursor-pointer group hover:bg-gray-50 p-2 rounded-2xl transition-all"
                  >
                    <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                          alt="Profile"
                          className="w-14 h-14 rounded-2xl object-cover border-4 border-white shadow-2xl group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white shadow-sm"></div>
                    </div>
                    <div className={`hidden lg:block ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                        <h3 className="text-sm font-black text-[#003366] leading-none mb-1 group-hover:text-[#C5A059] transition-colors">{user?.name || 'سعاد الإدريسي'}</h3>
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{t('administrator') || 'Administrator'}</p>
                    </div>
                    <ChevronDown size={16} className={`text-slate-300 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Profile Dropdown */}
                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)}></div>
                      <div className={`absolute top-full mt-2 ${lang === 'ar' ? 'left-0' : 'right-0'} w-64 bg-white rounded-[2rem] shadow-2xl border border-gray-100 py-4 z-20 animate-premium-in`}>
                        <Link 
                          to={`/personnel/${user?.id || 1}`} 
                          onClick={() => setProfileOpen(false)}
                          className={`flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors text-sm font-bold text-slate-600 ${lang === 'ar' ? 'flex-row-reverse text-right' : ''}`}
                        >
                          <UserIcon size={18} className="text-[#C5A059]" />
                          <span>{t('profile') || 'الملف الشخصي'}</span>
                        </Link>
                        <Link 
                          to="/parametres" 
                          onClick={() => setProfileOpen(false)}
                          className={`flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors text-sm font-bold text-slate-600 ${lang === 'ar' ? 'flex-row-reverse text-right' : ''}`}
                        >
                          <SettingsIcon size={18} className="text-[#C5A059]" />
                          <span>{t('settings') || 'الإعدادات'}</span>
                        </Link>
                        <div className="h-px bg-gray-50 mx-4 my-2"></div>
                        <button 
                          onClick={handleLogout}
                          className={`flex items-center gap-4 px-6 py-4 hover:bg-rose-50 transition-colors text-sm font-black text-rose-500 w-full ${lang === 'ar' ? 'flex-row-reverse text-right' : ''}`}
                        >
                          <LogOut size={18} />
                          <span>{t('logout') || 'تسجيل الخروج'}</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-12 custom-scrollbar animate-premium-in">
          <div className="max-w-[1600px] mx-auto">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
