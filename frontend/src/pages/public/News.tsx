import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Tag, ArrowRight } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const News = () => {
  const { lang, t } = useLang();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: lang === 'ar' ? 'الكل' : 'Tout' },
    { id: 'official', label: t('officialActivity') },
    { id: 'admin', label: t('administrative') },
    { id: 'cultural', label: t('cultural') },
    { id: 'infrastructure', label: t('infrastructure') },
  ];

  const newsItems = [
    {
      id: 1,
      title: t('newsItemTitle'),
      desc: t('newsItemDesc'),
      date: '24 May 2024',
      category: 'infrastructure',
      categoryLabel: t('infrastructure'),
      img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1200',
      featured: true
    },
    {
      id: 2,
      title: t('newsItem2Title'),
      desc: t('newsItem2Desc'),
      date: '22 May 2024',
      category: 'cultural',
      categoryLabel: t('cultural'),
      img: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: t('newsItem3Title'),
      desc: t('newsItem3Desc'),
      date: '20 May 2024',
      category: 'cultural',
      categoryLabel: t('cultural'),
      img: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      title: t('newsItem4Title'),
      desc: t('newsItem4Desc'),
      date: '18 May 2024',
      category: 'admin',
      categoryLabel: t('administrative'),
      img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 5,
      title: t('newsItem5Title'),
      desc: t('newsItem5Desc'),
      date: '15 May 2024',
      category: 'environment',
      categoryLabel: t('environment'),
      img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 6,
      title: t('newsItem6Title'),
      desc: t('newsItem6Desc'),
      date: '12 May 2024',
      category: 'infrastructure',
      categoryLabel: t('infrastructure'),
      img: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const filteredNews = activeCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  const featuredItem = newsItems.find(item => item.featured);
  const regularItems = filteredNews.filter(item => !item.featured || activeCategory !== 'all');

  return (
    <div className="bg-gray-50 min-h-screen pb-20" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <div className="bg-[#003366] text-white pt-24 pb-32 px-4 md:px-8 relative overflow-hidden">
        {/* Subtle Pattern Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className={`flex flex-col ${lang === 'ar' ? 'items-start' : 'items-start'}`}>
            <h1 className="text-4xl md:text-5xl font-black mb-6">{t('news')}</h1>
            <div className="w-24 h-2 bg-yellow-500 rounded-full mb-8"></div>
            <p className="text-xl text-blue-100 max-w-2xl font-medium">
              {t('newsTitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 -mt-16 relative z-20">
        {/* Categories Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 mb-12 flex flex-wrap gap-3 items-center">
          <div className={`flex items-center gap-2 px-4 py-2 text-gray-400 border-r border-gray-100 ${lang === 'ar' ? 'ml-2' : 'mr-2'}`}>
            <Tag size={18} />
            <span className="text-sm font-bold">{lang === 'ar' ? 'تصفية حسب:' : 'Filtrer par:'}</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#003366] text-white shadow-lg'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured News Section */}
        {activeCategory === 'all' && featuredItem && (
          <div className="mb-16 group">
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col lg:flex-row h-full min-h-[500px]">
              <div className="lg:w-3/5 relative overflow-hidden">
                <img 
                  src={featuredItem.img} 
                  alt={featuredItem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute top-8 right-8 bg-yellow-500 text-[#003366] px-6 py-2 rounded-full text-sm font-black shadow-xl">
                  {t('featuredNews')}
                </div>
              </div>
              <div className={`lg:w-2/5 p-12 flex flex-col justify-center ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-3 text-gray-400 mb-6 font-bold text-sm">
                  <Calendar size={18} className="text-yellow-600" />
                  <span>{featuredItem.date}</span>
                  <span className="mx-2">•</span>
                  <span className="text-[#004b93]">{featuredItem.categoryLabel}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 leading-tight group-hover:text-[#004b93] transition-colors">
                  {featuredItem.title}
                </h2>
                <p className="text-gray-500 text-lg mb-10 leading-relaxed line-clamp-4">
                  {featuredItem.desc}
                </p>
                <button className={`flex items-center gap-3 text-[#003366] font-black text-lg group/btn hover:gap-5 transition-all w-fit ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  {t('readMore')}
                  {lang === 'ar' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grid Section */}
        <div className="flex flex-col items-start mb-10">
          <h2 className="text-2xl font-black text-gray-800 mb-2">{t('latestUpdates')}</h2>
          <div className="w-16 h-1 bg-[#004b93] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {regularItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group cursor-pointer border border-gray-100 flex flex-col h-full hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute top-5 ${lang === 'ar' ? 'right-5' : 'left-5'} bg-white/90 backdrop-blur-md text-[#003366] px-4 py-1.5 rounded-xl text-xs font-black shadow-lg border border-white/20`}>
                  {item.categoryLabel}
                </div>
              </div>
              <div className={`p-8 flex-1 flex flex-col ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-2 text-xs text-gray-400 font-bold mb-4 uppercase tracking-widest">
                  <Calendar size={14} className="text-blue-300" />
                  {item.date}
                </div>
                <h3 className="font-black text-gray-800 text-xl mb-5 leading-snug group-hover:text-[#004b93] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
                  <span className={`text-[#004b93] font-black text-sm flex items-center gap-2 group-hover:gap-3 transition-all ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    {t('readMore')}
                    {lang === 'ar' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <Tag size={40} />
            </div>
            <h3 className="text-xl font-black text-gray-800 mb-2">
              {lang === 'ar' ? 'لا توجد أخبار في هذه الفئة' : 'Aucune actualité dans cette catégorie'}
            </h3>
            <p className="text-gray-400">
              {lang === 'ar' ? 'يرجى اختيار فئة أخرى أو العودة لاحقاً' : 'Veuillez choisir une autre catégorie ou revenir plus tard'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
