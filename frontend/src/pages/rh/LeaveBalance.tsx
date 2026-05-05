import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const mockLeaveBalance = [
  { id: 1, name: 'أحمد العلوي', total: 22, used: 5, remaining: 17, img: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'فاطمة الزهراء بنعلي', total: 22, used: 12, remaining: 10, img: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'محمد أمين الناصري', total: 22, used: 0, remaining: 22, img: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'سمية آيت الطالب', total: 22, used: 15, remaining: 7, img: 'https://i.pravatar.cc/150?u=4' },
];

const LeaveBalance = () => {
  const { t, lang } = useLang();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="animate-slide-up space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('leaveBalance')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('leaveManagement')} / {t('leaveBalance')}</p>
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
          <button className="flex items-center gap-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">
            <Filter size={16} />
            {t('filters')}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <thead className="bg-gray-50 dark:bg-slate-900/80 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="p-5">{t('employeeName')}</th>
                <th className="p-5">{lang === 'ar' ? 'الرصيد الإجمالي' : 'Total'}</th>
                <th className="p-5">{lang === 'ar' ? 'المستخدم' : 'Utilisé'}</th>
                <th className="p-5">{lang === 'ar' ? 'المتبقي' : 'Restant'}</th>
                <th className="p-5">{lang === 'ar' ? 'نسبة الاستهلاك' : 'Consommation'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {mockLeaveBalance.filter(e => e.name.includes(searchTerm)).map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <img src={item.img} alt={item.name} className="w-10 h-10 rounded-xl border-2 border-white shadow-sm" />
                      <span className="font-bold text-gray-800 dark:text-white text-sm">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-5 font-bold text-gray-500 dark:text-gray-400">{item.total} {lang === 'ar' ? 'يوم' : 'J'}</td>
                  <td className="p-5 font-bold text-amber-600">{item.used} {lang === 'ar' ? 'يوم' : 'J'}</td>
                  <td className="p-5">
                    <span className="px-3 py-1.5 bg-emerald-50 text-[#0d5e3f] rounded-lg font-black text-sm border border-emerald-100">
                      {item.remaining} {lang === 'ar' ? 'يوم' : 'J'}
                    </span>
                  </td>
                  <td className="p-5 min-w-[200px]">
                    <div className={`flex items-center gap-3 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            (item.used / item.total) > 0.7 ? 'bg-rose-500' :
                            (item.used / item.total) > 0.4 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${(item.used / item.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-black text-gray-400">{Math.round((item.used / item.total) * 100)}%</span>
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

export default LeaveBalance;
