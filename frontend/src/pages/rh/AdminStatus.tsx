import { useState } from 'react';
import { UserCheck, UserX, Clock, Search, Filter } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const mockStatuses = [
  { id: 1, name: 'أحمد العلوي', department: 'المصلحة الصحية', status: 'نشط', since: '2020-01-15' },
  { id: 2, name: 'فاطمة الزهراء بنعلي', department: 'الموارد البشرية', status: 'في عطلة', since: '2024-05-10' },
  { id: 3, name: 'محمد أمين الناصري', department: 'المصلحة البيطرية', status: 'نشط', since: '2022-03-20' },
  { id: 4, name: 'سمية آيت الطالب', department: 'الكتابة العامة', status: 'موقوف', since: '2024-04-01' },
];

const AdminStatus = () => {
  const { t, lang } = useLang();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="animate-slide-up space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('adminStatus')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('adminStatus')} / {t('adminStatus')}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: lang === 'ar' ? 'نشط' : 'Actif', value: '214', icon: <UserCheck size={24} />, color: 'emerald' },
          { label: lang === 'ar' ? 'في عطلة' : 'En congé', value: '18', icon: <Clock size={24} />, color: 'amber' },
          { label: lang === 'ar' ? 'موقوف' : 'Suspendu', value: '3', icon: <UserX size={24} />, color: 'rose' },
        ].map((card, i) => (
          <div key={i} className={`gov-card flex items-center gap-4 border-${lang === 'ar' ? 'r' : 'l'}-4 border-${card.color}-500`}>
            <div className={`p-4 bg-${card.color}-50 text-${card.color}-600 rounded-2xl`}>
              {card.icon}
            </div>
            <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{card.label}</p>
              <p className="text-2xl font-black text-gray-800 dark:text-white">{card.value}</p>
            </div>
          </div>
        ))}
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
                <th className="p-5">{t('service')}</th>
                <th className="p-5">{t('status')}</th>
                <th className="p-5">{lang === 'ar' ? 'منذ تاريخ' : 'Depuis le'}</th>
                <th className="p-5 text-center">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {mockStatuses.filter(s => s.name.includes(searchTerm)).map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#0d5e3f]/10 rounded-full flex items-center justify-center text-[#0d5e3f] font-bold text-xs border border-[#0d5e3f]/20">
                        {item.name.charAt(0)}
                      </div>
                      <span className="font-bold text-gray-800 dark:text-white text-sm">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-5 text-sm text-gray-600 dark:text-gray-300 font-bold">{item.department}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border ${
                      item.status === 'نشط' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      item.status === 'في عطلة' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-rose-50 text-rose-700 border-rose-100'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-5 text-sm text-gray-400 font-bold">{item.since}</td>
                  <td className="p-5 text-center">
                    <button className="text-[#0d5e3f] text-xs font-black uppercase hover:underline">{t('edit')}</button>
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

export default AdminStatus;
