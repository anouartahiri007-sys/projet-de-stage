import { useLang } from '../context/LangContext';
import { FilePlus, Search, FileText, Eye, Download } from 'lucide-react';

const Documents = () => {
  const { t, lang } = useLang();

  return (
    <div className="animate-slide-up space-y-6 pb-12" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-3xl font-extrabold text-[#1E3E6E] dark:text-white font-heading">{t('documentManagement')}</h1>
          <p className="text-slate-500 mt-1 font-medium italic">{t('documentDesc')}</p>
        </div>
        <button className="bg-[#0d5e3f] hover:bg-[#0a4a31] text-white flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-900/10 active:scale-95 transition-all">
          <FilePlus size={18} /> {t('generateDocument')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="gov-card p-6">
            <h2 className={`text-sm font-black text-slate-400 uppercase tracking-widest mb-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('categories')}</h2>
            <div className="space-y-2">
              {[
                { label: t('workCertificates'), count: 142 },
                { label: t('nominationDecisions'), count: 58 },
                { label: t('gradingSheets'), count: 890 },
                { label: t('medicalRecords'), count: 312 },
                { label: t('administrativeActs'), count: '1.200' },
              ].map((cat, i) => (
                <button key={i} className={`w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-sm font-bold text-slate-600 transition-colors group ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <span className="group-hover:text-[#1E3E6E]">{cat.label}</span>
                  <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg text-[10px]">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="gov-card overflow-hidden">
            <div className={`p-6 border-b border-slate-100 flex items-center justify-between ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">{t('recentDocuments')}</h2>
              <div className="relative w-64">
                <Search className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`} size={16} />
                <input placeholder={t('searchDocument')} className={`w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-[#1E3E6E] outline-none ${lang === 'ar' ? 'pr-10 text-right' : 'pl-10 text-left'}`} />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <thead>
                  <tr className="bg-slate-50/50">
                    {[t('documentName'), t('agent'), t('date'), t('status'), t('actions')].map(h => (
                      <th key={h} className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[1, 2, 3, 4, 5].map(n => (
                    <tr key={n} className="hover:bg-slate-50/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FileText size={18} /></div>
                          <span className="text-sm font-bold text-slate-700">{t('salaryCertificate')}_#{n}042</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-500 font-medium">Ahmed El Mansouri</td>
                      <td className="p-4 text-xs text-slate-400 font-bold">24/04/2025</td>
                      <td className="p-4">
                        <span className="text-[10px] font-black uppercase px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">{t('signed')}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"><Eye size={16} /></button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-emerald-600 transition-colors"><Download size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
