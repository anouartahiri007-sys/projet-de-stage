import { Network, RefreshCw } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const Organigramme = () => {
  const { t, lang } = useLang();

  return (
    <div className="animate-slide-up space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('orgChart')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('employeeManagement')} / {t('orgChart')}</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 min-h-[500px] flex flex-col items-center justify-center bg-gray-50/30 dark:bg-slate-900/30 relative overflow-hidden">
        <div className="pattern-moroccan-light absolute inset-0 opacity-10"></div>
        
        <div className="text-center max-w-lg relative z-10">
          <div className="w-20 h-20 bg-emerald-100 text-[#0d5e3f] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-white dark:border-slate-700 animate-bounce">
            <Network size={32} />
          </div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white mb-3">{t('orgChart')}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed font-medium">
             {lang === 'ar' 
               ? 'سيتم عرض المخطط التنظيمي للمصالح والأقسام هنا بشكل تفاعلي. يدعم النظام ترتيب الموظفين وعرض العلاقات الإدارية بوضوح.'
               : 'L\'organigramme interactif des services sera affiché ici. Le système permet d\'organiser les employés et de visualiser clairement les relations hiérarchiques.'
             }
          </p>
          <button className="bg-[#0d5e3f] hover:bg-[#0a4a31] text-white px-8 py-3 rounded-xl font-extrabold transition-all shadow-lg shadow-emerald-900/10 active:scale-95 flex items-center gap-2 mx-auto">
            <RefreshCw size={18} />
            {lang === 'ar' ? 'تحديث الهيكل' : 'Actualiser l\'organigramme'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Organigramme;
