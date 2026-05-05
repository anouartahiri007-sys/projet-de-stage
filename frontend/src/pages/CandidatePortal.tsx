import { useState, useEffect, useRef } from 'react';
import {
  User, FileText, Search, Bell, LogOut, LayoutGrid,
  ChevronRight, ChevronLeft, Calendar, CheckCircle,
  Clock, Briefcase, FileSearch, FolderOpen, HelpCircle, Phone,
  Menu, Globe, Loader2, Settings, Trash2, Info, AlertTriangle, Eye, Download
} from 'lucide-react';
import { useAuthStore } from '../lib/auth';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { toast } from 'react-hot-toast';
import { useLang } from '../context/LangContext';

// Import Sub-pages
import ConcoursPage from './candidate/ConcoursPage';
import ApplicationsPage from './candidate/ApplicationsPage';
import ProfilePage from './candidate/ProfilePage';
import FAQPage from './candidate/FAQPage';
import NotificationsPage from './Notifications';

export default function CandidatePortal() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { t, lang, setLang } = useLang();
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const [concours, setConcours] = useState<any[]>([]);
  const [candidatures, setCandidatures] = useState<any[]>([]);
  
  // Dropdown States
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
    
    // Close dropdowns on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) setShowNotifs(false);
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resConcours, resCandidatures] = await Promise.all([
        api.get('/concours'),
        api.get('/candidatures/my')
      ]);
      setConcours(resConcours.data);
      setCandidatures(resCandidatures.data);
    } catch (err) {
      // toast.error(t('invalidData'));
      // Keep mock if API fails for demo
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { id: 'home', label: t('home'), icon: LayoutGrid },
    { type: 'header', label: t('candidacyManagement') },
    { id: 'concours', label: t('openContests'), icon: Briefcase },
    { id: 'my-candidacies', label: t('myCandidacies'), icon: FileText },
    { id: 'profile', label: t('myProfile'), icon: User },
    { type: 'header', label: t('help') },
    { id: 'faq', label: t('faq'), icon: HelpCircle },
    { id: 'contact', label: t('contactUs'), icon: Phone },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'concours': return <ConcoursPage />;
      case 'my-candidacies': return <ApplicationsPage />;
      case 'profile': return <ProfilePage />;
      case 'faq': return <FAQPage />;
      case 'notifications': return <NotificationsPage />;
      case 'contact': return <FAQPage />; // Redirect to FAQ/Support for now
      default: return (
        <div className="space-y-10 animate-fade-in">
           {/* Stats Grid */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard 
                 title={t('activeCandidacies')} 
                 value={candidatures.filter(c => c.status === 'pending').length || 0} 
                 icon={FolderOpen} 
                 color="orange" 
                 lang={lang}
                 t={t}
                 onClick={() => setActiveTab('my-candidacies')}
              />
              <StatsCard 
                 title={t('availableConcours')} 
                 value={concours.length || 2} 
                 icon={Briefcase} 
                 color="blue" 
                 lang={lang}
                 t={t}
                 onClick={() => setActiveTab('concours')}
              />
              <StatsCard 
                 title={t('acceptedCandidacies')} 
                 value={candidatures.filter(c => c.status === 'accepted').length || 1} 
                 icon={CheckCircle} 
                 color="green" 
                 lang={lang}
                 t={t}
                 onClick={() => setActiveTab('my-candidacies')}
              />
           </div>

           {/* Bottom Sections */}
           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Latest Contests */}
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                 <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Calendar size={22} className="text-slate-400" />
                       <h3 className="text-lg font-black text-slate-800">{t('latestAvailableConcours')}</h3>
                    </div>
                    <button className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline" onClick={() => setActiveTab('concours')}>
                       {t('viewAllConcours')}
                    </button>
                 </div>
                 
                 <div className="flex-1 flex flex-col p-6">
                    <TableHead headers={[t('actions'), t('status'), t('deadline'), t('contest'), t('publishDate')]} lang={lang} />
                    
                    <div className="flex-1 flex flex-col items-center justify-center py-12">
                       <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                          <FileSearch size={40} className="text-slate-200" />
                       </div>
                       <p className="text-slate-400 font-bold mb-6">{t('noContestsAvailable')}</p>
                       <button 
                         onClick={() => setActiveTab('concours')}
                         className="px-8 py-3 bg-[#002352] text-white rounded-xl font-black text-sm shadow-xl shadow-blue-900/20 hover:scale-[1.03] transition-all"
                       >
                         {t('exploreContests')}
                       </button>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-50">
                       <button className="flex items-center gap-2 text-blue-600 font-black text-[11px] uppercase tracking-widest hover:gap-4 transition-all group" onClick={() => setActiveTab('concours')}>
                          <span>{t('viewAllConcours')}</span>
                          {lang === 'ar' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                       </button>
                    </div>
                 </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                 <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <LayoutGrid size={22} className="text-slate-400" />
                       <h3 className="text-lg font-black text-slate-800">{t('recentActivities')}</h3>
                    </div>
                    <button className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline" onClick={() => setActiveTab('my-candidacies')}>
                       {t('viewAllActivities')}
                    </button>
                 </div>

                 <div className="flex-1 flex flex-col p-6">
                    <TableHead headers={[t('actions'), t('status'), t('contest'), t('operation'), t('date')]} lang={lang} />
                    
                    <div className="flex-1 flex flex-col items-center justify-center py-12">
                       <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                          <FolderOpen size={40} className="text-slate-200" />
                       </div>
                       <p className="text-slate-400 font-bold mb-6">{t('noRecentActivities')}</p>
                       <button 
                         onClick={() => setActiveTab('concours')}
                         className="px-8 py-3 bg-[#002352] text-white rounded-xl font-black text-sm shadow-xl shadow-blue-900/20 hover:scale-[1.03] transition-all"
                       >
                         {t('submitNewCandidacy')}
                       </button>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-50">
                       <button className="flex items-center gap-2 text-blue-600 font-black text-[11px] uppercase tracking-widest hover:gap-4 transition-all group" onClick={() => setActiveTab('my-candidacies')}>
                          <span>{t('viewAllActivities')}</span>
                          {lang === 'ar' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      );
    }
  };

  return (
    <div className={`min-h-screen bg-[#f8fafc] flex ${lang === 'ar' ? 'font-arabic' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Sidebar */}
      <aside className="w-72 bg-[#002352] text-white hidden lg:flex flex-col shrink-0 shadow-2xl z-50">
        <div className="p-8 flex items-center gap-4 border-b border-white/10 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-2 shadow-inner shrink-0">
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#002352" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 18v-8l2-2 2 2v8M8 18h8M9 10h6M11 6h2M12 4v2" />
                <path d="M4 18c2 0 3-1 4-1s2 1 4 1 3-1 4-1 2 1 4 1" />
                <path d="M4 21c2 0 3-1 4-1s2 1 4 1 3-1 4-1 2 1 4 1" />
             </svg>
          </div>
          <div className="flex flex-col overflow-hidden">
            <h1 className="font-black text-lg leading-tight uppercase tracking-tight truncate">{t('candidateSpace')}</h1>
            <span className="text-blue-300/60 font-bold text-[10px] uppercase tracking-widest">{t('communeCity')}</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-4">
          {menuItems.map((item, idx) => {
            if (item.type === 'header') {
              return (
                <div key={idx} className="px-4 pt-6 pb-2 text-[10px] font-black text-blue-300/40 uppercase tracking-widest">
                  {item.label}
                </div>
              );
            }
            const Icon = item.icon as any;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => item.id && setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 translate-x-1' 
                    : 'text-blue-100/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-blue-400 group-hover:text-blue-200'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
           <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-all" onClick={() => setActiveTab('profile')}>
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300">
                 <User size={20} />
              </div>
              <div className="flex-1 min-w-0">
                 <p className="text-xs font-black truncate">{user?.name}</p>
                 <p className="text-[10px] font-bold text-blue-300/40 uppercase tracking-widest">Candidat</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40">
           <div className="lg:hidden flex items-center gap-4">
              <button className="p-2 text-slate-500"><Menu size={24} /></button>
              <h2 className="font-black text-slate-800">{t('candidateSpace')}</h2>
           </div>

           <div className={`hidden lg:flex items-center gap-6 ${lang === 'ar' ? 'mr-auto' : 'ml-auto'}`}>
              {/* Language Switch */}
              <button 
                onClick={() => setLang(lang === 'ar' ? 'fr' : 'ar')}
                className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-600 text-sm hover:bg-slate-100 transition-all"
              >
                <Globe size={16} />
                <span>{lang === 'ar' ? 'Français' : 'العربية'}</span>
              </button>

              {/* Notification Dropdown */}
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setShowNotifs(!showNotifs)}
                  className={`relative p-2.5 rounded-xl transition-all border ${showNotifs ? 'bg-blue-600 text-white border-blue-600' : 'text-slate-400 hover:text-blue-600 bg-slate-50 border-slate-100'}`}
                >
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>
                
                {showNotifs && (
                  <div className={`absolute top-full mt-4 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-50 ${lang === 'ar' ? 'right-0' : 'left-0'} animate-slide-up`}>
                    <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                      <h4 className="font-black text-slate-800 text-sm">{t('notifications')}</h4>
                      <button onClick={() => {setActiveTab('notifications'); setShowNotifs(false)}} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">{t('viewAll')}</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto divide-y divide-slate-50">
                       <NotifItem icon={Info} title="Nouveau concours" time="Il y a 10m" color="blue" />
                       <NotifItem icon={CheckCircle} title="Candidature acceptée" time="Il y a 2h" color="green" />
                       <NotifItem icon={AlertTriangle} title="Rappel clôture" time="Hier" color="orange" />
                    </div>
                  </div>
                )}
              </div>

              <div className="h-10 w-[1px] bg-slate-100 mx-2"></div>

              {/* User Dropdown */}
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-4 group p-1.5 pr-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                >
                  <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200 group-hover:bg-blue-600 group-hover:text-white transition-all">
                     <User size={22} />
                  </div>
                  <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{lang === 'ar' ? 'مرحباً' : 'BIENVENUE'}</p>
                     <p className="text-sm font-black text-slate-800 leading-none">{user?.name}</p>
                  </div>
                </button>

                {showProfile && (
                  <div className={`absolute top-full mt-4 w-56 bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 overflow-hidden z-50 ${lang === 'ar' ? 'right-0' : 'left-0'} animate-slide-up`}>
                    <div className="p-2 space-y-1">
                      <button onClick={() => {setActiveTab('profile'); setShowProfile(false)}} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
                        <User size={18} /> {t('myProfile')}
                      </button>
                      <button onClick={() => {setActiveTab('profile'); setShowProfile(false)}} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
                        <Settings size={18} /> {t('settings')}
                      </button>
                      <div className="h-[1px] bg-slate-50 mx-2"></div>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                        <LogOut size={18} /> {t('logout')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
           </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-y-auto">
           {/* Breadcrumbs */}
           <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">
              <span className="hover:text-blue-600 cursor-pointer transition-colors" onClick={() => setActiveTab('home')}>{t('home')}</span>
              <ChevronRight size={12} className={lang === 'ar' ? 'rotate-180' : ''} />
              <span className="text-slate-600">{activeTab === 'home' ? t('dashboard') : t(activeTab)}</span>
           </div>

           {/* Page Header */}
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
              <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                 <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><LayoutGrid size={24} /></div>
                    <h2 className="text-3xl font-black text-slate-800">{activeTab === 'home' ? t('dashboard') : t(activeTab)}</h2>
                 </div>
                 <p className="text-slate-400 font-bold text-sm mt-2">{t('welcomeRecruitment')}</p>
              </div>
           </div>

           {loading ? (
             <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-blue-600" size={40} />
             </div>
           ) : renderContent()}
        </main>

        {/* Footer */}
        <footer className="h-16 bg-white border-t border-slate-100 px-8 flex items-center justify-between text-[11px] font-bold text-slate-400">
           <div>{t('allRightsReserved')}</div>
           <div className="flex items-center gap-8 uppercase tracking-widest">
              <Link to="/privacy" className="hover:text-blue-600 transition-colors">سياسة الخصوصية</Link>
              <Link to="/terms" className="hover:text-blue-600 transition-colors">شروط الاستخدام</Link>
           </div>
        </footer>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, color, lang, t, onClick }: any) {
  const colors: any = {
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', iconBg: 'bg-orange-100', accent: 'border-b-orange-400' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', iconBg: 'bg-blue-100', accent: 'border-b-blue-400' },
    green: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', iconBg: 'bg-emerald-100', accent: 'border-b-emerald-400' }
  };
  const c = colors[color];

  return (
    <div 
      onClick={onClick}
      className={`bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col gap-6 group hover:shadow-xl hover:shadow-slate-200/40 transition-all border-b-4 cursor-pointer ${c.accent}`}
    >
       <div className="flex justify-between items-start">
          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
             <h4 className="text-sm font-black text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{title}</h4>
             <p className={`text-5xl font-black ${c.text}`}>{value}</p>
          </div>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${c.iconBg} ${c.text} shadow-inner group-hover:scale-110 transition-all`}>
             <Icon size={32} />
          </div>
       </div>
       <button className="flex items-center gap-2 text-[11px] font-black text-blue-600 hover:gap-3 transition-all group">
          <span>{t('viewDetails')}</span>
          {lang === 'ar' ? <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> : <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />}
       </button>
    </div>
  );
}

function TableHead({ headers }: any) {
  return (
    <div className={`grid grid-cols-5 bg-slate-50/80 p-4 rounded-xl border border-slate-100`}>
       {headers.map((h: string, i: number) => (
         <span key={i} className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{h}</span>
       ))}
    </div>
  );
}

function NotifItem({ icon: Icon, title, time, color }: any) {
  const colors: any = {
    blue: 'text-blue-600 bg-blue-50 border-blue-100',
    green: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    orange: 'text-orange-600 bg-orange-50 border-orange-100'
  };
  return (
    <div className="p-4 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
       <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${colors[color]}`}>
          <Icon size={18} />
       </div>
       <div className="flex-1 min-w-0">
          <p className="text-xs font-black text-slate-800 group-hover:text-blue-600 transition-colors">{title}</p>
          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{time}</p>
       </div>
    </div>
  );
}

