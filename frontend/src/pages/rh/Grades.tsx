import { useState } from 'react';
import { Search, Filter, Plus, FileSpreadsheet, Edit, Trash2 } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const mockGrades = [
  { id: 1, title: 'متصرف من الدرجة الممتازة', scale: 'خارج السلم', compensations: '4,500 درهم' },
  { id: 2, title: 'متصرف من الدرجة الأولى', scale: 'السلم 11', compensations: '3,200 درهم' },
  { id: 3, title: 'متصرف من الدرجة الثانية', scale: 'السلم 10', compensations: '2,800 درهم' },
  { id: 4, title: 'طبيب من الدرجة الممتازة', scale: 'خارج السلم', compensations: '8,500 درهم' },
];

const Grades = () => {
  const { t, lang } = useLang();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="animate-slide-up space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <div className="flex gap-3">
          <button className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-sm">
            <FileSpreadsheet size={18} className="text-emerald-600" />
            {lang === 'ar' ? 'تصدير Excel' : 'Exporter Excel'}
          </button>
          <button className="bg-[#0d5e3f] hover:bg-[#0a4a31] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/10 active:scale-95 text-sm">
            <Plus size={18} />
            {lang === 'ar' ? 'إضافة درجة' : 'Ajouter un grade'}
          </button>
        </div>
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('gradesScale')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('adminStatus')} / {t('gradesScale')}</p>
        </div>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        {/* Filters */}
        <div className={`p-6 border-b border-gray-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30 dark:bg-slate-900/30 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
          <div className="relative w-full md:w-80">
            <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={18} />
            <input 
              type="text" 
              placeholder={lang === 'ar' ? 'ابحث عن درجة أو سلم...' : 'Rechercher un grade...'} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${lang === 'ar' ? 'pr-12 text-right' : 'pl-12 text-left'} py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-[#0d5e3f] text-sm transition-all`}
            />
          </div>
          <button className="flex items-center gap-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">
            <Filter size={16} />
            {t('filters')}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <thead className="bg-gray-50 dark:bg-slate-900/80 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="p-5">ID</th>
                <th className="p-5">{t('grade')}</th>
                <th className="p-5">{t('level')}</th>
                <th className="p-5">{t('bonuses')}</th>
                <th className="p-5 text-center">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {mockGrades.filter(g => g.title.includes(searchTerm) || g.scale.includes(searchTerm)).map((grade) => (
                <tr key={grade.id} className="hover:bg-emerald-50/30 dark:hover:bg-slate-700/50 transition-colors group">
                  <td className="p-5 text-xs text-gray-500 font-bold">#{grade.id}</td>
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-xs border border-emerald-100">
                        {grade.id}
                      </div>
                      <span className="font-bold text-gray-800 dark:text-white text-sm">{grade.title}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-[10px] font-black uppercase border border-slate-200 dark:border-slate-600">
                      {grade.scale}
                    </span>
                  </td>
                  <td className="p-5 text-sm font-black text-[#0d5e3f]">{grade.compensations}</td>
                  <td className="p-5">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={16} /></button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className={`p-5 bg-gray-50/50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between text-[10px] text-gray-400 font-black uppercase tracking-widest`}>
          <span>{lang === 'ar' ? 'إجمالي الدرجات' : 'Total Grades'}: {mockGrades.length}</span>
          <span>{t('lastUpdated')}: {new Date().toLocaleDateString(lang === 'ar' ? 'ar-MA' : 'fr-MA')}</span>
        </div>
      </div>
    </div>
  );
};

export default Grades;
