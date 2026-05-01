import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Info, 
  CalendarDays, 
  Megaphone, 
  Users, 
  FileDown,
  MapPin,
  ChevronLeft
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Focus search if navigated from search icon
    if (location.search === '?search=focus') {
      document.getElementById('main-search')?.focus();
    }
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setShowSuggestions(false);
  };

  return (
    <>
      {/* --- HERO SECTION --- */}
      <section className="relative h-[500px] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/commune_hero.png" 
            alt="Commune Building" 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=2000';
            }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 flex flex-col items-center mt-[-40px]">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            مرحباً بكم في الموقع الرسمي للجماعة
          </h2>
          <p className="text-white text-xl md:text-2xl mb-8 drop-shadow-md">
            خدمات إلكترونية معلوماتية لخدمة المواطنين
          </p>
          <button 
            onClick={() => navigate('/services')}
            className="bg-[#0d5e3f] hover:bg-[#0a4a31] text-white px-8 py-3 rounded font-bold text-lg transition-colors"
          >
            اكتشف المزيد
          </button>
        </div>

        {/* Overlapping Search Bar with Autocomplete */}
        <div className="absolute bottom-0 translate-y-1/2 w-full max-w-4xl px-4 z-30">
          <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-xl p-2 flex items-center h-16 relative">
             <div className="pr-4 text-gray-400">
               <Search size={20} />
             </div>
             <input 
               id="main-search"
               type="text" 
               placeholder="ابحث عن وثيقة، خدمة، إعلان..." 
               className="flex-1 h-full px-4 text-gray-700 outline-none text-lg bg-transparent"
               value={searchQuery}
               onChange={(e) => {
                 setSearchQuery(e.target.value);
                 setShowSuggestions(e.target.value.length > 0);
               }}
             />
             <button type="submit" className="bg-[#0d5e3f] hover:bg-[#0a4a31] text-white px-10 h-full rounded font-bold text-lg transition-colors">
               بحث
             </button>

             {/* Autocomplete Suggestions */}
             {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 py-2 overflow-hidden z-50 text-right">
                  <div className="px-4 py-2 text-xs font-bold text-gray-400 bg-gray-50 border-b border-gray-100">نتائج البحث في الخدمات، الوثائق، والإعلانات</div>
                  <button type="button" onClick={() => navigate('/services')} className="w-full text-right px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors border-b border-gray-50">
                    <Users size={16} className="text-[#0d5e3f]" />
                    <span className="text-gray-700"><span className="font-bold">خدمة:</span> شواهد الحالة المدنية</span>
                  </button>
                  <button type="button" onClick={() => navigate('/services')} className="w-full text-right px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors border-b border-gray-50">
                    <MapPin size={16} className="text-[#0d5e3f]" />
                    <span className="text-gray-700"><span className="font-bold">خدمة:</span> طلب رخصة التعمير</span>
                  </button>
                  <button type="button" onClick={() => navigate('/documents')} className="w-full text-right px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                    <FileDown size={16} className="text-[#0d5e3f]" />
                    <span className="text-gray-700"><span className="font-bold">وثيقة:</span> الهيكل التنظيمي للجماعة</span>
                  </button>
                </div>
             )}
          </form>
        </div>
      </section>

      {/* --- QUICK SERVICES CARDS --- */}
      <section className="pt-24 pb-16 px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { title: 'تحميل الوثائق', icon: <FileDown size={32} />, path: '/documents', color: 'bg-emerald-50 text-emerald-600' },
            { title: 'الخدمات الرقمية', icon: <Users size={32} />, path: '/services', color: 'bg-blue-50 text-blue-600' },
            { title: 'إعلانات الجماعة', icon: <Megaphone size={32} />, path: '/announcements', color: 'bg-amber-50 text-amber-600' },
            { title: 'مشاريع وأنشطة', icon: <CalendarDays size={32} />, path: '/projects', color: 'bg-purple-50 text-purple-600' },
            { title: 'عن الجماعة', icon: <Info size={32} />, path: '/about', color: 'bg-sky-50 text-sky-600' },
          ].map((card, i) => (
            <div 
              key={i} 
              onClick={() => navigate(card.path)}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all cursor-pointer group hover:-translate-y-1"
            >
              <div className={`w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">{card.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">اطلع على كافة التفاصيل والمعلومات المتعلقة بـ {card.title}</p>
              <button className="mt-6 text-[#0d5e3f] font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                المزيد <ChevronLeft size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* --- NEWS SECTION --- */}
      <section className="py-16 bg-gray-50 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-10">
             <div className="text-right">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">آخر أخبار ومستجدات الجماعة</h2>
                <div className="w-20 h-1 bg-yellow-500 rounded"></div>
             </div>
             <button onClick={() => navigate('/news')} className="text-[#0d5e3f] font-bold hover:underline mb-2">مشاهدة الكل</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer border border-gray-100">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800&v=${n}`} 
                    alt="News" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded text-xs font-bold">مستجدات</div>
                </div>
                <div className="p-6 text-right">
                  <span className="text-xs text-gray-400 font-bold mb-2 block">24 مايو 2024</span>
                  <h3 className="font-bold text-gray-800 text-lg mb-3 leading-tight group-hover:text-[#0d5e3f] transition-colors">
                    انطلاق أشغال تهيئة المساحات الخضراء بمركز المدينة
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    في إطار برنامج التنمية الحضرية للجماعة، تم اليوم إعطاء انطلاقة أشغال تهيئة وتزيين الحدائق العمومية والساحات...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
