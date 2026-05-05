import { useState } from 'react';
import { Search, Download, Calendar } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const mockHistory = [
  { id: 1, name: 'أحمد العلوي', year: 2023, score: 18.5, grade: 'ممتاز', gradeFr: 'Excellent', observer: 'سعاد الإدريسي' },
  { id: 2, name: 'أحمد العلوي', year: 2022, score: 17.0, grade: 'جيد جداً', gradeFr: 'Très Bien', observer: 'سعاد الإدريسي' },
  { id: 3, name: 'فاطمة الزهراء بنعلي', year: 2023, score: 19.0, grade: 'ممتاز', gradeFr: 'Excellent', observer: 'محمد العلمي' },
];

const EvalHistory = () => {
  const { t, lang } = useLang();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2023');

  return (
    <div className="animate-slide-up space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <button className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-sm shadow-sm">
          <Download size={18} className="text-[#0d5e3f]" />
          {lang === 'ar' ? 'تصدير الأرشيف' : 'Exporter l\'archive'}
        </button>
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('evalHistory')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('performanceEval')} / {t('evalHistory')}</p>
        </div>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className={`p-6 border-b border-gray-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30 dark:bg-slate-900/30 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
          <div className="relative w-full md:w-80">
            <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={18} />
            <input 
              type="text" 
              placeholder={t('search')} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${lang === 'ar' ? 'pr-12 text-right' : 'pl-12 text-left'} py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-[#0d5e3f] text-sm transition-all`}
            />
          </div>
          <div className={`flex gap-3 items-center ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{lang === 'ar' ? 'السنة' : 'Année'}:</span>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-2.5 rounded-xl text-sm font-bold text-[#0d5e3f] outline-none focus:ring-2 focus:ring-[#0d5e3f] shadow-sm"
            >
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <thead className="bg-gray-50 dark:bg-slate-900/80 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="p-5">{t('employeeName')}</th>
                <th className="p-5">{lang === 'ar' ? 'السنة' : 'Année'}</th>
                <th className="p-5">{lang === 'ar' ? 'النقطة' : 'Score'}</th>
                <th className="p-5">{lang === 'ar' ? 'التقدير' : 'Mention'}</th>
                <th className="p-5">{lang === 'ar' ? 'المقيم' : 'Observateur'}</th>
                <th className="p-5 text-center">{lang === 'ar' ? 'التقرير' : 'Rapport'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {mockHistory.filter(h => h.name.includes(searchTerm) && h.year.toString() === selectedYear).map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="p-5">
                    <span className="font-bold text-gray-800 dark:text-white text-sm">{item.name}</span>
                  </td>
                  <td className="p-5">
                    <span className={`flex items-center gap-1.5 text-xs text-gray-400 font-bold ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                      <Calendar size={12} className="text-[#0d5e3f]" />
                      {item.year}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className="font-black text-[#0d5e3f] text-base">{item.score}</span>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                      item.grade === 'ممتاز' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      item.grade === 'جيد جداً' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      'bg-slate-50 text-slate-700 border-slate-100'
                    }`}>
                      {lang === 'ar' ? item.grade : item.gradeFr}
                    </span>
                  </td>
                  <td className="p-5 text-sm text-gray-500 font-bold">{item.observer}</td>
                  <td className="p-5 text-center">
                    <button className="text-[#0d5e3f] hover:underline font-black text-[10px] uppercase tracking-widest flex items-center gap-2 justify-center mx-auto transition-all">
                      <Download size={14} />
                      PDF
                    </button>
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

export default EvalHistory;
