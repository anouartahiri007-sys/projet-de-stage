import { useState } from 'react';
import { Star, Search, Filter, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const mockEvaluations = [
  { id: 1, name: 'أحمد العلوي', department: 'المصلحة الصحية', score: 18.5, lastEval: '2023-12-15', status: 'completed' },
  { id: 2, name: 'فاطمة الزهراء بنعلي', department: 'الموارد البشرية', score: 19.0, lastEval: '2023-12-20', status: 'completed' },
  { id: 3, name: 'محمد أمين الناصري', department: 'المصلحة البيطرية', score: 15.5, lastEval: '2023-11-30', status: 'completed' },
];

const PerformanceEval = () => {
  const { t, lang } = useLang();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="animate-slide-up space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <button className="bg-[#0d5e3f] hover:bg-[#0a4a31] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/10 active:scale-95 text-sm">
          <Star size={18} />
          {lang === 'ar' ? 'بدء دورة تقييم جديدة' : 'Nouvelle évaluation'}
        </button>
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('performanceEval')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('performanceEval')} / {t('performanceEval')}</p>
        </div>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className={`p-6 border-b border-gray-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30 dark:bg-slate-900/30 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
          <div className="relative w-full md:w-80">
            <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={18} />
            <input 
              type="text" 
              placeholder={t('searchEmployee')} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${lang === 'ar' ? 'pr-12 text-right' : 'pl-12 text-left'} py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-[#0d5e3f] text-sm transition-all`}
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">
              <Filter size={16} />
              {t('filters')}
            </button>
            <select className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 outline-none focus:ring-2 focus:ring-[#0d5e3f]">
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <thead className="bg-gray-50 dark:bg-slate-900/80 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="p-5">{t('employeeName')}</th>
                <th className="p-5">{t('service')}</th>
                <th className="p-5">{lang === 'ar' ? 'النقطة' : 'Score'}</th>
                <th className="p-5">{lang === 'ar' ? 'آخر تقييم' : 'Dernier'}</th>
                <th className="p-5">{t('status')}</th>
                <th className="p-5 text-center">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {mockEvaluations.filter(e => e.name.includes(searchTerm)).map((evalItem) => (
                <tr key={evalItem.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 text-[#0d5e3f] rounded-xl flex items-center justify-center font-bold text-xs border border-emerald-100">
                        {evalItem.name.charAt(0)}
                      </div>
                      <span className="font-bold text-gray-800 dark:text-white text-sm">{evalItem.name}</span>
                    </div>
                  </td>
                  <td className="p-5 text-sm text-gray-500 font-bold">{evalItem.department}</td>
                  <td className="p-5">
                    <span className="font-black text-[#0d5e3f] text-lg">{evalItem.score} <span className="text-[10px] text-gray-400">/ 20</span></span>
                  </td>
                  <td className="p-5 text-sm text-gray-400 font-bold">{evalItem.lastEval}</td>
                  <td className="p-5">
                    <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                      evalItem.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {evalItem.status === 'completed' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                      {evalItem.status === 'completed' ? (lang === 'ar' ? 'مكتمل' : 'Complété') : (lang === 'ar' ? 'قيد الانتظار' : 'En attente')}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center">
                      <button className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${
                        evalItem.status === 'completed' 
                        ? 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700' 
                        : 'bg-[#0d5e3f] text-white hover:bg-[#0a4a31] shadow-lg shadow-emerald-900/10'
                      }`}>
                        {evalItem.status === 'completed' ? t('edit') : (lang === 'ar' ? 'تقييم الآن' : 'Évaluer')}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceEval;
