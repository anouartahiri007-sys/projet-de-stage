import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Info,
  CalendarDays,
  Megaphone,
  Users,
  FileDown,
  ChevronLeft,
  ArrowRight,
  Globe,
  LayoutGrid,
  MapPin,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useLang } from '../context/LangContext';

const Landing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, t } = useLang();
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<{title: string, path: string, type: string}[]>([]);

  const searchData = [
    { key: 'serviceCivilStatus', path: '/services', type: 'service' },
    { key: 'serviceUrbanism', path: '/services', type: 'service' },
    { key: 'serviceAdminCert', path: '/services', type: 'service' },
    { key: 'serviceTaxes', path: '/services', type: 'service' },
    { key: 'serviceDocTitle', path: '/documents', type: 'doc' },
    { key: 'serviceAnnouncementsTitle', path: '/announcements', type: 'announcement' },
    { key: 'serviceProjectsTitle', path: '/projects', type: 'project' },
    { key: 'newsTitle', path: '/news', type: 'news' },
  ];

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = searchData
        .filter(item => t(item.key).toLowerCase().includes(searchQuery.toLowerCase()))
        .map(item => ({ title: t(item.key), path: item.path, type: item.type }));
      setResults(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchQuery, lang]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      navigate(results[0].path);
      setShowResults(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC]" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative h-[750px] flex items-center justify-center overflow-hidden">
        {/* Cinematic Background with Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1920"
            alt="Municipality Portal"
            className="w-full h-full object-cover scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/90 via-[#003366]/70 to-[#F8FAFC]"></div>
          <div className="absolute inset-0 pattern-moroccan opacity-10"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-10 animate-premium-in">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white text-xs font-black uppercase tracking-[0.3em]">
             <span className="w-2 h-2 bg-[#C5A059] rounded-full"></span>
             {t('communeName')} {t('communeCity')}
          </div>
          <h2 className="text-white text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
            {t('heroTitle').split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? 'text-[#C5A059]' : ''}>{word} </span>
            ))}
          </h2>
          <p className="text-blue-100/80 text-xl md:text-2xl mb-12 font-medium max-w-3xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
          
          {/* Advanced Search Bar Component */}
          <div className="relative w-full max-w-4xl mx-auto">
             <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,51,102,0.2)] p-2.5 flex flex-col md:flex-row items-center gap-3 border border-white/30">
                <div className="flex-1 flex items-center w-full px-6 h-16 md:h-20">
                   <Search size={28} className="text-[#C5A059] opacity-70" />
                   <input
                     id="main-search"
                     type="text"
                     placeholder={t('searchPlaceholder')}
                     className={`flex-1 h-full text-[#003366] outline-none text-xl bg-transparent font-black placeholder:text-gray-300 ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                     autoComplete="off"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                </div>
                <button type="submit" className="w-full md:w-auto bg-[#003366] hover:bg-[#006241] text-white px-12 h-16 md:h-20 rounded-[1.8rem] font-black text-lg transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl active:scale-95 group">
                   <LayoutGrid size={22} className="group-hover:rotate-90 transition-transform duration-500" />
                   {t('searchBtn')}
                </button>
             </form>

             {/* Dynamic Results Dropdown */}
             {showResults && results.length > 0 && (
               <div className="absolute top-full left-4 right-4 mt-4 bg-white rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50">
                  <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('searchSuggestionsHeader')}</p>
                     <span className="px-3 py-1 bg-[#006241]/10 text-[#006241] text-[10px] font-black rounded-lg">{results.length} نتائج</span>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                     {results.map((result, idx) => (
                       <div 
                         key={idx}
                         onClick={() => navigate(result.path)}
                         className="p-6 hover:bg-[#F8FAFC] cursor-pointer flex items-center justify-between group transition-all border-b border-gray-50 last:border-0"
                       >
                         <div className="flex items-center gap-6">
                           <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-[#003366] shadow-sm group-hover:bg-[#003366] group-hover:text-white transition-all">
                              {result.type === 'service' ? <Globe size={20} /> : <FileDown size={20} />}
                           </div>
                           <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                             <p className="font-black text-gray-800 text-lg group-hover:text-[#003366]">{result.title}</p>
                             <p className="text-[10px] text-[#C5A059] font-black uppercase tracking-widest">{result.type}</p>
                           </div>
                         </div>
                         <ArrowRight size={20} className={`text-gray-300 group-hover:text-[#003366] transition-all ${lang === 'ar' ? 'rotate-180' : ''}`} />
                       </div>
                     ))}
                  </div>
               </div>
             )}
          </div>
        </div>
      </section>

      {/* --- QUICK SERVICES GRID --- */}
      <section className="relative z-40 -mt-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: t('serviceDocTitle'), icon: <FileDown size={32} />, path: '/documents', color: 'blue' },
            { title: t('serviceDigitalTitle'), icon: <Users size={32} />, path: '/services', color: 'emerald' },
            { title: t('serviceAnnouncementsTitle'), icon: <Megaphone size={32} />, path: '/announcements', color: 'amber' },
            { title: t('serviceProjectsTitle'), icon: <LayoutGrid size={32} />, path: '/projects', color: 'navy' },
          ].map((card, i) => (
            <div
              key={i}
              onClick={() => navigate(card.path)}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white hover:border-[#C5A059]/30 flex flex-col items-center text-center hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 cursor-pointer group hover:-translate-y-3"
            >
              <div className="w-20 h-20 bg-[#F8FAFC] text-[#003366] rounded-3xl flex items-center justify-center mb-8 group-hover:bg-[#003366] group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-sm">
                {card.icon}
              </div>
              <h3 className="font-black text-[#003366] text-xl mb-4 leading-tight">{card.title}</h3>
              <p className="text-sm text-gray-400 font-medium leading-relaxed mb-8">
                 الولوج المباشر لكافة الخدمات الإدارية والوثائق الرقمية الخاصة بالمواطنين.
              </p>
              <div className="mt-auto flex items-center gap-2 text-[#C5A059] font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                {t('discoverMore')} <ExternalLink size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- MUNICIPAL NEWS SECTION --- */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
            <span className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.3em] mb-4 block">{t('newsBadge')}</span>
            <h2 className="text-4xl md:text-6xl font-black text-[#003366] tracking-tight">{t('newsTitle')}</h2>
          </div>
          <button onClick={() => navigate('/news')} className="px-8 py-4 bg-white border border-gray-100 rounded-2xl font-black text-sm text-[#003366] hover:bg-[#003366] hover:text-white transition-all shadow-sm">
             {t('viewAll')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: lang === 'ar' ? 'افتتاح مركز الخدمات الرقمية الجديد' : 'Ouverture du nouveau centre numérique',
              date: '12 مايو 2024',
              category: 'بنية تحتية',
              img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800'
            },
            {
              title: lang === 'ar' ? 'مشروع تحديث المساحات الخضراء' : 'Projet de modernisation des espaces verts',
              date: '18 مايو 2024',
              category: 'بيئة',
              img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800'
            },
            {
              title: lang === 'ar' ? 'رقمنة الحالة المدنية بالجماعة' : 'Numérisation de l\'état civil',
              date: '24 مايو 2024',
              category: 'إدارة',
              img: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800'
            }
          ].map((news, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative h-80 rounded-[2.5rem] overflow-hidden mb-8 shadow-xl">
                 <img
                   src={news.img}
                   alt={news.title}
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/80 to-transparent"></div>
                 <div className="absolute bottom-8 left-8 right-8">
                    <span className="px-4 py-1.5 bg-[#C5A059] text-white text-[10px] font-black rounded-lg uppercase tracking-widest mb-4 inline-block">{news.category}</span>
                    <h3 className="text-white text-2xl font-black leading-tight group-hover:text-[#C5A059] transition-colors">{news.title}</h3>
                 </div>
              </div>
              <div className={`flex items-center gap-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                 <span className="text-xs text-gray-400 font-bold">{news.date}</span>
                 <div className="flex-1 h-[1px] bg-gray-100"></div>
                 <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-all">
                    <ArrowRight size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-20 px-6">
         <div className="max-w-7xl mx-auto bg-[#003366] rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 pattern-moroccan opacity-5"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
               <h2 className="text-white text-4xl md:text-6xl font-black leading-tight">{t('footerCtaTitle') || 'خدمتكم غايتنا'}</h2>
               <p className="text-blue-100/60 text-lg font-medium">{t('footerCtaDesc') || 'انضم إلينا في مسيرة التحول الرقمي لجماعتنا الترابية.'}</p>
               <button onClick={() => navigate('/login')} className="bg-[#C5A059] hover:bg-[#006241] text-white px-12 py-5 rounded-2xl font-black text-lg transition-all shadow-2xl shadow-blue-900/40">
                  {t('login')}
               </button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Landing;

