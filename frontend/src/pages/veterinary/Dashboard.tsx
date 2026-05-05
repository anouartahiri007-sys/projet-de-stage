import { useState } from 'react';
import {
  PawPrint, Activity, Syringe, FilePlus,
  Calendar, Clock, CheckCircle, AlertCircle,
  Plus, Search, TrendingUp, Bell, ChevronRight,
  ArrowUpRight, MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../context/LangContext';

const APPOINTMENTS = (t: any, lang: string) => [
  { id: 1, time: '09:00', date: lang === 'ar' ? '20 ماي 2024' : '20 Mai 2024', title: lang === 'ar' ? 'زيارة مزرعة النخيل' : 'Visite Ferme Nakhl', desc: lang === 'ar' ? 'أبقار حلوب - 12 رأس' : 'Vaches laitières - 12 têtes', img: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=100&q=80' },
  { id: 2, time: '10:30', date: lang === 'ar' ? '20 ماي 2024' : '20 Mai 2024', title: lang === 'ar' ? 'تطعيم كلاب ضالة' : 'Vaccination chiens errants', desc: lang === 'ar' ? 'كلاب - جماعة المدينة' : 'Chiens - Commune urbaine', img: 'https://images.unsplash.com/photo-1541364983171-a8ba01d95cfc?auto=format&fit=crop&w=100&q=80' },
  { id: 3, time: '12:00', date: lang === 'ar' ? '20 ماي 2024' : '20 Mai 2024', title: lang === 'ar' ? 'فحص أغنام' : 'Examen ovins', desc: lang === 'ar' ? 'أغنام - 30 رأس' : 'Moutons - 30 têtes', img: 'https://images.unsplash.com/photo-1484557918186-7b4e59ad7335?auto=format&fit=crop&w=100&q=80' },
  { id: 4, time: '14:30', date: lang === 'ar' ? '20 ماي 2024' : '20 Mai 2024', title: lang === 'ar' ? 'متابعة حالة مرضية' : 'Suivi cas pathologique', desc: lang === 'ar' ? 'ماعز - 8 رأس' : 'Chèvres - 8 têtes', img: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=100&q=80' },
  { id: 5, time: '16:00', date: lang === 'ar' ? '20 ماي 2024' : '20 Mai 2024', title: lang === 'ar' ? 'زيارة دواجن' : 'Visite avicole', desc: lang === 'ar' ? 'دجاج لاحم - 200 رأس' : 'Poulets de chair - 200 têtes', img: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=100&q=80' },
];

const RECENT_CASES = (t: any, lang: string) => [
  { id: 1, name: lang === 'ar' ? 'حمى قلاعية' : 'Fièvre aphteuse', desc: lang === 'ar' ? 'أبقار حلوب - 8 رأس' : 'Vaches laitières - 8 têtes', time: lang === 'ar' ? '18 ماي 2024' : '18 Mai 2024', status: t('high'), color: 'bg-rose-50 text-rose-700 border-rose-100' },
  { id: 2, name: lang === 'ar' ? 'التهاب رئوي' : 'Pneumonie', desc: lang === 'ar' ? 'أغنام - 5 رأس' : 'Moutons - 5 têtes', time: lang === 'ar' ? '17 ماي 2024' : '17 Mai 2024', status: t('medium'), color: 'bg-amber-50 text-amber-700 border-amber-100' },
  { id: 3, name: lang === 'ar' ? 'طفيليات خارجية' : 'Parasites externes', desc: lang === 'ar' ? 'ماعز - 10 رأس' : 'Chèvres - 10 têtes', time: lang === 'ar' ? '16 ماي 2024' : '16 Mai 2024', status: t('low'), color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { id: 4, name: lang === 'ar' ? 'إنفلونزا الطيور' : 'Grippe aviaire', desc: lang === 'ar' ? 'دواجن - 150 رأس' : 'Volailles - 150 têtes', time: lang === 'ar' ? '15 ماي 2024' : '15 Mai 2024', status: t('medium'), color: 'bg-amber-50 text-amber-700 border-amber-100' },
];

const VetDashboard = () => {
  const navigate = useNavigate();
  const { t, lang } = useLang();

  const stats = [
    { label: t('totalAnimals'), value: '1,248', trend: lang === 'ar' ? '+8 هذا الشهر' : '+8 ce mois', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600', icon: <PawPrint size={20} /> },
    { label: t('activeHealthCases'), value: '86', trend: lang === 'ar' ? '+12% هذا الشهر' : '+12% ce mois', bgColor: 'bg-blue-50', textColor: 'text-blue-600', icon: <Activity size={20} /> },
    { label: t('completedVaccinations'), value: '320', trend: lang === 'ar' ? '+15% هذا الشهر' : '+15% ce mois', bgColor: 'bg-purple-50', textColor: 'text-purple-600', icon: <Syringe size={20} /> },
    { label: t('certificatesIssued'), value: '42', trend: lang === 'ar' ? '+10% هذا الشهر' : '+10% ce mois', bgColor: 'bg-amber-50', textColor: 'text-amber-600', icon: <FilePlus size={20} /> },
  ];

  const quickActions = [
    { icon: <Plus size={22} />, label: t('addAnimal'), onClick: () => navigate('/veterinaire/animals/add') },
    { icon: <Syringe size={22} />, label: t('registerVaccination'), onClick: () => navigate('/veterinaire/vaccinations/add') },
    { icon: <FilePlus size={22} />, label: t('issueVetCertificate'), onClick: () => navigate('/veterinaire/certificates/issue') },
    { icon: <Activity size={22} />, label: t('registerHealthCase'), onClick: () => navigate('/veterinaire/health/register') },
  ];

  return (
    <div className={`animate-slide-up space-y-8 pb-12 ${lang === 'ar' ? 'font-arabic' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>

      {/* --- STATS GRID --- */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`gov-card p-6 flex flex-col group hover:scale-[1.03] transition-transform ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center justify-between mb-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`p-4 rounded-2xl ${stat.bgColor} ${stat.textColor} group-hover:rotate-12 transition-transform`}>
                {stat.icon}
              </div>
              <div className={`text-[10px] font-black ${stat.textColor} ${stat.bgColor} px-2 py-1 rounded-lg`}>
                {stat.trend}
              </div>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-slate-800 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* APPOINTMENTS */}
        <section className={`lg:col-span-4 gov-card overflow-hidden ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className={`p-6 border-b border-slate-100 flex items-center justify-between bg-gray-50/30 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Calendar size={20} className="text-emerald-600" />
              {t('appointmentsToday')}
            </h2>
          </div>
          <div className="divide-y divide-slate-50">
            {APPOINTMENTS(t, lang).map(item => (
              <div key={item.id} className={`p-4 hover:bg-slate-50/50 transition-colors flex items-center gap-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="text-center min-w-[60px]">
                  <p className="text-sm font-black text-emerald-700">{item.time}</p>
                  <p className="text-[9px] text-gray-400 font-bold">{item.date.split(' ')[0]} {item.date.split(' ')[1]}</p>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-800">{item.title}</h3>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
                <img src={item.img} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-100" />
              </div>
            ))}
          </div>
          <button className="w-full py-3 text-xs font-bold text-gray-500 hover:bg-gray-50 border-t border-gray-50">
            {t('viewAllAppointments')}
          </button>
        </section>

        {/* RECENT CASES */}
        <section className={`lg:col-span-4 gov-card overflow-hidden ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className={`p-6 border-b border-slate-100 flex items-center justify-between bg-gray-50/30 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Activity size={20} className="text-emerald-600" />
              {t('recentHealthCases')}
            </h2>
          </div>
          <div className="divide-y divide-slate-50">
            {RECENT_CASES(t, lang).map(item => (
              <div key={item.id} className={`p-5 hover:bg-slate-50/50 transition-colors flex items-center justify-between ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex items-center gap-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <span className={`px-2 py-1 rounded text-[10px] font-black border ${item.color}`}>
                    {item.status}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-gray-800">{item.name}</h3>
                    <p className="text-[10px] text-gray-400 font-bold">{item.desc}</p>
                  </div>
                </div>
                <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                  <p className="text-[10px] text-gray-400 font-bold">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 text-xs font-bold text-gray-500 hover:bg-gray-50 border-t border-gray-50">
            {t('viewAllCases')}
          </button>
        </section>

        {/* QUICK ACTIONS & STATS */}
        <section className="lg:col-span-4 space-y-8">
          <div className="gov-card p-6">
            <h2 className={`text-lg font-bold text-gray-800 mb-5 flex items-center gap-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <TrendingUp size={20} className="text-emerald-600" />
              {t('quickAccess')}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={action.onClick}
                  className="flex flex-col items-center justify-center p-5 rounded-2xl border border-slate-50 bg-slate-50/50 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all group"
                >
                  <div className="mb-2 text-emerald-600">
                    {action.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase text-center leading-tight">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
            <button className={`w-full mt-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-600 flex items-center justify-center gap-2`}>
              <Search size={16} />
              {t('searchAnimal')}
            </button>
          </div>

          <div className="gov-card p-6">
            <h2 className={`text-lg font-bold text-gray-800 mb-5 flex items-center gap-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <TrendingUp size={20} className="text-emerald-600" />
              {t('animalHealthStats')}
            </h2>
            <div className="space-y-4">
              {[
                { label: t('totalAnimals'), value: '1,248', color: 'bg-emerald-500', width: '90%' },
                { label: t('activeHealthCases'), value: '86', color: 'bg-blue-500', width: '40%' },
                { label: t('completedVaccinations'), value: '320', color: 'bg-purple-500', width: '65%' },
                { label: t('certificatesIssued'), value: '42', color: 'bg-amber-500', width: '25%' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className={`flex justify-between text-[10px] font-black text-gray-500 uppercase ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.width }}></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 text-xs font-bold text-emerald-700 border border-emerald-100 rounded-lg hover:bg-emerald-50">
              {t('viewMoreStats')}
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default VetDashboard;
