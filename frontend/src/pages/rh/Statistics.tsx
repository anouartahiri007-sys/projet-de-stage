import { PieChart, BarChart3, TrendingUp, Users, Calendar, Activity } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const Statistics = () => {
  const { t, lang } = useLang();

  return (
    <div className="animate-slide-up space-y-8 pb-12" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <div className="bg-white dark:bg-slate-800 p-1.5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm flex gap-1">
          <button className="px-4 py-1.5 bg-emerald-50 text-[#0d5e3f] rounded-lg text-xs font-bold">{lang === 'ar' ? 'هذا الشهر' : 'Ce mois'}</button>
          <button className="px-4 py-1.5 text-gray-400 rounded-lg text-xs font-bold hover:bg-gray-50 dark:hover:bg-slate-700">{lang === 'ar' ? 'هذه السنة' : 'Cette année'}</button>
        </div>
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white font-heading">{t('statistics')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('hrReports')} / {t('statistics')}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: t('activeEmployees'), value: '248', trend: '+12', icon: <Users size={20} />, color: 'emerald' },
          { label: lang === 'ar' ? 'الموظفون النشطون' : 'Actifs', value: '214', trend: '+8', icon: <Activity size={20} />, color: 'blue' },
          { label: t('pendingRequests'), value: '18', trend: lang === 'ar' ? '+3 جديدة' : '+3 nouv.', icon: <Calendar size={20} />, color: 'amber' },
          { label: lang === 'ar' ? 'الترقيات هذا الشهر' : 'Promotions', value: '7', trend: '+2', icon: <TrendingUp size={20} />, color: 'purple' },
        ].map((stat, i) => (
          <div key={i} className={`gov-card p-6 relative overflow-hidden group hover:scale-[1.02] transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className={`absolute top-0 ${lang === 'ar' ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-24 h-24 bg-${stat.color}-500/5 rounded-full -translate-y-1/2`}></div>
            <div className={`flex items-center justify-between mb-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`p-4 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl shadow-inner`}>
                {stat.icon}
              </div>
              <span className={`text-[9px] font-black ${stat.trend.includes('جديدة') || stat.trend.includes('nouv') ? 'text-amber-600' : 'text-emerald-600'} bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-gray-100 dark:border-slate-800 shadow-sm`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-gray-800 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 gov-card p-8 border-b-4 border-b-[#0d5e3f]">
          <div className={`flex items-center justify-between mb-8 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
            <h2 className="text-xl font-black text-gray-800 dark:text-white flex items-center gap-3 uppercase tracking-widest">
              <BarChart3 size={24} className="text-[#0d5e3f]" />
              {lang === 'ar' ? 'توزيع الموظفين حسب المصلحة' : 'Répartition par Service'}
            </h2>
          </div>
          
          <div className="space-y-8">
            {[
              { label: lang === 'ar' ? 'المصلحة الصحية' : 'Service Santé', value: 138, total: 248, color: 'bg-emerald-500' },
              { label: lang === 'ar' ? 'المصلحة البيطرية' : 'Service Vétérinaire', value: 32, total: 248, color: 'bg-blue-500' },
              { label: lang === 'ar' ? 'الكتابة العامة' : 'Secrétariat Général', value: 28, total: 248, color: 'bg-amber-500' },
              { label: lang === 'ar' ? 'المصالح التقنية' : 'Services Techniques', value: 24, total: 248, color: 'bg-purple-500' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className={`flex justify-between text-xs font-black uppercase tracking-widest ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <span className="text-gray-700 dark:text-gray-200">{item.label}</span>
                  <span className="text-gray-400">{item.value} {lang === 'ar' ? 'موظف' : 'Emp.'}</span>
                </div>
                <div className="w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className={`h-full rounded-full ${item.color} transition-all duration-1000 shadow-[0_0_10px_rgba(0,0,0,0.1)]`} 
                    style={{ width: `${(item.value / item.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 gov-card p-8 flex flex-col border-b-4 border-b-blue-500">
          <h2 className={`text-xl font-black text-gray-800 dark:text-white mb-8 flex items-center gap-3 uppercase tracking-widest ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <PieChart size={24} className="text-[#0d5e3f]" />
            {lang === 'ar' ? 'نسبة الأدوار' : 'Rôles'}
          </h2>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-56 h-56 rounded-full border-[20px] border-emerald-500 flex items-center justify-center mb-8 shadow-xl">
               <div className="absolute inset-0 border-[20px] border-blue-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 50%)' }}></div>
               <div className="absolute inset-0 border-[20px] border-amber-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
               <div className="text-center">
                 <p className="text-4xl font-black text-gray-800 dark:text-white">248</p>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{lang === 'ar' ? 'إجمالي' : 'Total'}</p>
               </div>
            </div>

            <div className="w-full space-y-4">
              {[
                { label: lang === 'ar' ? 'أطباء' : 'Médecins', count: 52, color: 'bg-emerald-500' },
                { label: lang === 'ar' ? 'ممرضون' : 'Infirmiers', count: 86, color: 'bg-blue-500' },
                { label: lang === 'ar' ? 'بياطرة' : 'Vétérinaires', count: 18, color: 'bg-amber-500' },
              ].map((item, i) => (
                <div key={i} className={`flex items-center justify-between ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex items-center gap-3 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-3 h-3 rounded-full ${item.color} shadow-lg shadow-current/20`}></div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-black text-gray-400 bg-gray-50 dark:bg-slate-900 px-2 py-0.5 rounded-full">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
