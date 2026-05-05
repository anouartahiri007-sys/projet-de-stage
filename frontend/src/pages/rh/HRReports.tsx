import { BarChart3, Download, FileText, Calendar, Filter, ArrowUpRight } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const HRReports = () => {
  const { t, lang } = useLang();
  
  const reports = [
    { title: lang === 'ar' ? 'التقرير السنوي للموارد البشرية 2023' : 'Rapport Annuel RH 2023', date: '2024-01-15', size: '4.5 MB', type: 'PDF' },
    { title: lang === 'ar' ? 'إحصائيات الغياب والعطل - الربع الأول 2024' : 'Statistiques Absences - Q1 2024', date: '2024-04-10', size: '2.1 MB', type: 'XLSX' },
    { title: lang === 'ar' ? 'تقرير توزيع كتلة الأجور حسب المصالح' : 'Masse Salariale par Service', date: '2024-05-05', size: '1.8 MB', type: 'PDF' },
  ];

  return (
    <div className="animate-slide-up space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <button className="bg-[#0d5e3f] hover:bg-[#0a4a31] text-white px-6 py-3 rounded-xl font-extrabold flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/10 active:scale-95 text-xs uppercase tracking-widest">
          <BarChart3 size={18} />
          {lang === 'ar' ? 'توليد تقرير جديد' : 'Générer un rapport'}
        </button>
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('hrReports')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('hrReports')} / {t('hrReports')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reports List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="gov-card p-0 overflow-hidden">
            <div className={`p-6 border-b border-gray-100 dark:border-slate-700 bg-gray-50/30 dark:bg-slate-900/30 flex items-center justify-between ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
               <h2 className="font-black text-xs text-gray-800 dark:text-white flex items-center gap-2 uppercase tracking-widest">
                <FileText size={22} className="text-[#0d5e3f]" />
                {lang === 'ar' ? 'أحدث التقارير الجاهزة' : 'Derniers rapports générés'}
              </h2>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-slate-700">
              {reports.map((report, idx) => (
                <div key={idx} className={`p-6 hover:bg-emerald-50/10 transition-all flex items-center justify-between group ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex items-center gap-5 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-14 h-14 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-[#0d5e3f] rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-all">
                      <FileText size={24} />
                    </div>
                    <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                      <h3 className="font-bold text-gray-800 dark:text-white text-base mb-1">{report.title}</h3>
                      <div className={`flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {report.date}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                        <span>{report.size}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                        <span className="text-[#0d5e3f]">{report.type}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-3 text-slate-300 hover:text-[#0d5e3f] hover:bg-emerald-50 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                    <Download size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Analytics Sidebar */}
        <div className="space-y-6">
          <div className="gov-card p-8 bg-[#0d5e3f] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className={`relative z-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <h3 className="text-xl font-black mb-6 uppercase tracking-widest">{lang === 'ar' ? 'ملخص المؤشرات' : 'Résumé KPI'}</h3>
              <div className="space-y-6">
                <div>
                  <div className={`flex justify-between text-[10px] font-black mb-2 uppercase tracking-widest ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <span className="text-emerald-200">{lang === 'ar' ? 'نسبة التغطية الصحية' : 'Couverture Santé'}</span>
                    <span>94%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-[94%] h-full bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                  </div>
                </div>
                <div>
                  <div className={`flex justify-between text-[10px] font-black mb-2 uppercase tracking-widest ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <span className="text-emerald-200">{lang === 'ar' ? 'رضا الموظفين' : 'Satisfaction'}</span>
                    <span>82%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-[82%] h-full bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]"></div>
                  </div>
                </div>
              </div>
              <div className="mt-10 pt-6 border-t border-white/10">
                <div className={`flex items-center justify-between ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-[10px] font-black uppercase text-emerald-300 tracking-widest mb-1">{lang === 'ar' ? 'معدل الدوران' : 'Taux Rotation'}</p>
                    <p className="text-3xl font-black">2.4%</p>
                  </div>
                  <div className="p-3 bg-emerald-800 rounded-2xl shadow-inner">
                    <ArrowUpRight size={24} className="text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="gov-card p-8">
            <h3 className={`font-black text-xs text-gray-800 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-700 pb-4 flex items-center gap-3 uppercase tracking-widest ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <Filter size={18} className="text-[#0d5e3f]" />
              {lang === 'ar' ? 'تصفية حسب' : 'Filtrer par'}
            </h3>
            <div className="space-y-4">
              <select className={`w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-[#0d5e3f] ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <option>{lang === 'ar' ? 'كل المصالح' : 'Tous les services'}</option>
                <option>{lang === 'ar' ? 'المصلحة الصحية' : 'Service de Santé'}</option>
                <option>{lang === 'ar' ? 'المصلحة البيطرية' : 'Service Vétérinaire'}</option>
              </select>
              <select className={`w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-[#0d5e3f] ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRReports;
