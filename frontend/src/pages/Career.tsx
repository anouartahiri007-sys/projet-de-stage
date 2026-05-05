import { useLang } from '../context/LangContext';
import { TrendingUp, Award, ChevronRight, ChevronLeft } from 'lucide-react';

const Career = () => {
  const { t, lang } = useLang();

  return (
    <div className="animate-slide-up space-y-6 pb-12" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-3xl font-extrabold text-[#1E3E6E] dark:text-white font-heading">{t('careerManagement')}</h1>
          <p className="text-slate-500 mt-1 font-medium italic">{t('careerDesc')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`gov-card p-8 bg-gradient-to-br from-[#1E3E6E] to-[#152c4d] text-white overflow-hidden relative ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className={`absolute top-0 ${lang === 'ar' ? 'left-0' : 'right-0'} p-8 opacity-10`}>
            <TrendingUp size={120} />
          </div>
          <h2 className="text-2xl font-bold mb-4">{t('promotionPlan')}</h2>
          <p className="text-indigo-100/70 mb-8 leading-relaxed">
            {t('promotionDesc')}
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-2.5 bg-[#0d5e3f] hover:bg-[#0a4a31] rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-900/40 active:scale-95">
              {t('viewLists')}
            </button>
            <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-all border border-white/10 active:scale-95">
              {t('practicalGuide')}
            </button>
          </div>
        </div>

        <div className={`gov-card p-8 flex flex-col justify-center ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-center gap-4 mb-6 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Award size={32} /></div>
            <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t('medalsAndDistinctions')}</h2>
              <p className="text-slate-500 text-xs font-medium">{t('recognitionDesc')}</p>
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            {t('medalsManagementDesc')}
          </p>
          <button className="w-full py-3 border-2 border-slate-100 hover:border-amber-200 hover:bg-amber-50 rounded-2xl text-slate-700 font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-95">
            {t('openSession')} {lang === 'ar' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Career;
