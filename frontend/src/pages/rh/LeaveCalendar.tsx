import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const LeaveCalendar = () => {
  const { t, lang } = useLang();
  const [currentDate] = useState(new Date());

  // Simplified calendar mock
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const events = [
    { day: 15, name: 'أحمد العلوي', type: lang === 'ar' ? 'إدارية' : 'Administrative' },
    { day: 20, name: 'فاطمة الزهراء', type: lang === 'ar' ? 'سنوية' : 'Annuelle' },
    { day: 22, name: 'محمد أمين', type: lang === 'ar' ? 'مرضية' : 'Maladie' },
  ];

  const monthName = currentDate.toLocaleString(lang === 'ar' ? 'ar-MA' : 'fr-MA', { month: 'long', year: 'numeric' });

  return (
    <div className="animate-slide-up space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <button className="p-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl text-gray-500"><ChevronRight size={20} className={lang === 'ar' ? '' : 'rotate-180'} /></button>
          <span className="text-sm font-black text-[#0d5e3f] px-6 uppercase tracking-widest">{monthName}</span>
          <button className="p-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl text-gray-500"><ChevronLeft size={20} className={lang === 'ar' ? '' : 'rotate-180'} /></button>
        </div>
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('leaveCalendar')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('leaveManagement')} / {t('leaveCalendar')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar Grid */}
        <div className="lg:col-span-3">
          <div className="gov-card p-4 border border-gray-100 dark:border-slate-700">
            <div className="grid grid-cols-7 gap-1">
              {(lang === 'ar' ? ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'] : ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']).map(day => (
                <div key={day} className="p-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{day}</div>
              ))}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`empty-${i}`} className="bg-gray-50/30 dark:bg-slate-900/30 min-h-[120px] rounded-2xl opacity-40"></div>
              ))}
              {days.map(day => {
                const dayEvents = events.filter(e => e.day === day);
                const isToday = day === 19;
                return (
                  <div key={day} className={`min-h-[120px] p-3 rounded-2xl border-2 transition-all group cursor-pointer ${isToday ? 'bg-emerald-50/50 border-[#0d5e3f] shadow-lg shadow-emerald-900/10' : 'bg-white dark:bg-slate-800 border-transparent hover:border-emerald-100 dark:hover:border-slate-600 hover:bg-emerald-50/10'}`}>
                    <span className={`text-sm font-black ${isToday ? 'text-[#0d5e3f]' : 'text-gray-400 group-hover:text-[#0d5e3f]'}`}>{day}</span>
                    <div className="mt-3 space-y-1.5">
                      {dayEvents.map((ev, idx) => (
                        <div key={idx} className={`text-[9px] font-black p-1.5 rounded-lg border-l-4 leading-tight uppercase tracking-wider ${
                          ev.type.includes('سنوية') || ev.type.includes('Annu') ? 'bg-emerald-50 text-emerald-700 border-emerald-400' :
                          ev.type.includes('مرضية') || ev.type.includes('Mala') ? 'bg-rose-50 text-rose-700 border-rose-400' : 'bg-blue-50 text-blue-700 border-blue-400'
                        }`}>
                          {ev.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Legend / Upcoming */}
        <div className="space-y-6">
          <div className="gov-card p-8 border-b-4 border-b-[#0d5e3f]">
            <h3 className={`font-black text-xs text-gray-800 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-700 pb-4 flex items-center gap-3 uppercase tracking-widest ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <CalendarIcon size={20} className="text-[#0d5e3f]" />
              {lang === 'ar' ? 'اليوم: 19 ماي' : 'Aujourd\'hui: 19 Mai'}
            </h3>
            <div className="space-y-4">
              <p className="text-xs text-gray-400 font-bold italic tracking-wide">{lang === 'ar' ? 'لا توجد عطل مسجلة لهذا اليوم.' : 'Aucun congé enregistré pour aujourd\'hui.'}</p>
            </div>
          </div>

          <div className="gov-card p-8">
            <h3 className={`font-black text-xs text-gray-800 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-700 pb-4 uppercase tracking-widest ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{lang === 'ar' ? 'أنواع العطل' : 'Types de Congés'}</h3>
            <div className="space-y-4">
              {[
                { label: lang === 'ar' ? 'عطلة سنوية' : 'Congé Annuel', color: 'bg-emerald-500' },
                { label: lang === 'ar' ? 'عطلة إدارية' : 'Congé Administratif', color: 'bg-blue-500' },
                { label: lang === 'ar' ? 'عطلة مرضية' : 'Congé de Maladie', color: 'bg-rose-500' },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-3 h-3 rounded-full ${item.color} shadow-lg shadow-current/20`}></div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveCalendar;
