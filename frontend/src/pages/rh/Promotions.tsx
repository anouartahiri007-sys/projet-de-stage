import { useState } from 'react';
import { TrendingUp, ArrowUpRight, Search, Calendar, ChevronRight } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const mockPromotions = [
  { id: 1, name: 'ياسين بومدين', from: 'السلم 9', to: 'السلم 10', date: '2024-05-15', type: 'ترقية في السلم' },
  { id: 2, name: 'خديجة أمزال', from: 'الدرجة 2', to: 'الدرجة الممتازة', date: '2024-03-10', type: 'ترقية في الدرجة' },
  { id: 3, name: 'يوسف المراكشي', from: 'المصلحة الصحية', to: 'المصلحة البيطرية', date: '2023-12-01', type: 'تنقل داخلي' },
];

const Promotions = () => {
  const { t, lang } = useLang();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="animate-slide-up space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <button className="bg-[#0d5e3f] hover:bg-[#0a4a31] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/10 active:scale-95 text-sm">
          <TrendingUp size={18} />
          {lang === 'ar' ? 'تسجيل ترقية جديدة' : 'Nouvelle promotion'}
        </button>
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('promotionsTransfers')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('adminStatus')} / {t('promotionsTransfers')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="gov-card p-0 overflow-hidden">
            <div className={`p-6 border-b border-gray-100 dark:border-slate-700 bg-gray-50/30 dark:bg-slate-900/30 flex justify-between items-center ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="relative">
                <Search className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`} size={16} />
                <input 
                  type="text" 
                  placeholder={t('search')} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pr-${lang === 'ar' ? '9' : '4'} pl-${lang === 'ar' ? '4' : '9'} py-2 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-[#0d5e3f] text-xs bg-white dark:bg-slate-900 transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                />
              </div>
              <h2 className="font-black text-xs text-gray-800 dark:text-white flex items-center gap-2 uppercase tracking-widest">
                <TrendingUp size={22} className="text-[#0d5e3f]" />
                {lang === 'ar' ? 'سجل الترقيات الأخيرة' : 'Registre des promotions'}
              </h2>
            </div>

            <div className="divide-y divide-gray-50 dark:divide-slate-700">
              {mockPromotions.filter(p => p.name.includes(searchTerm)).map((promo) => (
                <div key={promo.id} className={`p-6 hover:bg-emerald-50/10 transition-all flex items-center justify-between ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex items-center gap-5 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-14 h-14 bg-white dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 text-[#0d5e3f] rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-all">
                      <ArrowUpRight size={22} />
                    </div>
                    <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                      <h3 className="font-bold text-gray-800 dark:text-white text-base">{promo.name}</h3>
                      <p className={`text-xs text-gray-500 mt-1 flex items-center gap-2 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                        <span className="text-slate-400 font-bold">{promo.from}</span>
                        <ChevronRight size={14} className={`text-emerald-500 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                        <span className="font-black text-[#0d5e3f]">{promo.to}</span>
                      </p>
                    </div>
                  </div>
                  <div className={lang === 'ar' ? 'text-left' : 'text-right'}>
                    <span className="block text-[10px] font-black text-[#0d5e3f] uppercase tracking-widest mb-1">{promo.type}</span>
                    <span className={`flex items-center gap-1 text-[11px] text-gray-400 font-bold ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <Calendar size={12} />
                      {promo.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="gov-card p-8 bg-[#0d5e3f] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className={`text-lg font-black mb-6 relative z-10 uppercase tracking-widest ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{lang === 'ar' ? 'إحصائيات السنة' : 'Stats de l\'année'}</h3>
            <div className="space-y-4 relative z-10">
              <div className={`flex justify-between items-center p-4 bg-white/10 rounded-2xl border border-white/10 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <span className="text-xs font-bold text-emerald-100">{lang === 'ar' ? 'إجمالي الترقيات' : 'Total Promotions'}</span>
                <span className="text-2xl font-black">42</span>
              </div>
              <div className={`flex justify-between items-center p-4 bg-white/10 rounded-2xl border border-white/10 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <span className="text-xs font-bold text-emerald-100">{lang === 'ar' ? 'تنقلات المصالح' : 'Mutations'}</span>
                <span className="text-2xl font-black">15</span>
              </div>
            </div>
          </div>
          
          <div className="gov-card p-8 border-l-4 border-l-amber-500">
            <h3 className={`font-black text-xs text-gray-800 dark:text-white mb-4 uppercase tracking-widest ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{lang === 'ar' ? 'تنبيهات الاستحقاق' : 'Éligibilité'}</h3>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-2xl">
              <p className={`text-[10px] font-black text-amber-800 dark:text-amber-400 uppercase tracking-widest mb-1 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{lang === 'ar' ? 'موظفون يستوفون الشروط' : 'Éligibles prochainement'}</p>
              <p className={`text-[11px] text-amber-600 dark:text-amber-500 font-medium ${lang === 'ar' ? 'text-right' : 'text-left'}`}>8 {lang === 'ar' ? 'موظفين لديهم أقدمية كافية للترقية القادمة.' : 'employés ont l\'ancienneté requise.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
