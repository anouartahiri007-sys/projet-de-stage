import { useState } from 'react';
import { Gift, Search, Plus, Filter, CreditCard, Award } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const mockBonuses = [
  { id: 1, name: 'أحمد العلوي', type: 'منحة الأداء السنوية', amount: '2,500', date: '2024-05-01', status: 'paid' },
  { id: 2, name: 'فاطمة الزهراء بنعلي', type: 'تعويض عن الساعات الإضافية', amount: '850', date: '2024-04-28', status: 'pending' },
  { id: 3, name: 'محمد أمين الناصري', type: 'منحة خاصة (مشروع التلقيح)', amount: '1,500', date: '2024-04-15', status: 'paid' },
];

const Bonuses = () => {
  const { t, lang } = useLang();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="animate-slide-up space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <button className="bg-[#0d5e3f] hover:bg-[#0a4a31] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/10 active:scale-95 text-sm">
          <Plus size={18} />
          {lang === 'ar' ? 'إضافة تعويض جديد' : 'Ajouter une prime'}
        </button>
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('bonuses')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('salaries')} / {t('bonuses')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="gov-card p-0 overflow-hidden">
            <div className={`p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50/30 dark:bg-slate-900/30 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="relative">
                <Search className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`} size={16} />
                <input 
                  type="text" 
                  placeholder={t('search')} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pr-${lang === 'ar' ? '9' : '4'} pl-${lang === 'ar' ? '4' : '9'} py-2 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-[#0d5e3f] text-xs bg-white dark:bg-slate-900 transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                />
              </div>
              <h2 className="font-black text-xs text-gray-800 dark:text-white flex items-center gap-2 uppercase tracking-widest">
                <Gift size={20} className="text-[#0d5e3f]" />
                {lang === 'ar' ? 'سجل التعويضات الأخيرة' : 'Registre des primes'}
              </h2>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-slate-700">
              {mockBonuses.filter(item => item.name.includes(searchTerm)).map((item) => (
                <div key={item.id} className={`p-6 hover:bg-emerald-50/10 transition-colors flex items-center justify-between ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex items-center gap-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-12 h-12 bg-emerald-50 text-[#0d5e3f] rounded-2xl flex items-center justify-center shrink-0">
                      <CreditCard size={20} />
                    </div>
                    <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                      <h3 className="font-bold text-gray-800 dark:text-white text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">{item.type}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-8 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={lang === 'ar' ? 'text-left' : 'text-right'}>
                      <span className="block text-base font-black text-[#0d5e3f]">{item.amount} DH</span>
                      <span className="text-[10px] text-gray-400 font-bold tracking-widest">{item.date}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                      item.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {item.status === 'paid' ? (lang === 'ar' ? 'تم الدفع' : 'Payé') : (lang === 'ar' ? 'قيد الانتظار' : 'En attente')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="gov-card p-8 border-b-4 border-b-[#0d5e3f]">
            <h3 className={`font-black text-xs text-gray-800 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-700 pb-4 uppercase tracking-widest ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{lang === 'ar' ? 'تصنيفات التعويضات' : 'Catégories'}</h3>
            <div className="space-y-4">
              {[
                { label: lang === 'ar' ? 'منح الأداء' : 'Primes de performance', count: 12, icon: <Award size={18} className="text-amber-500" /> },
                { label: lang === 'ar' ? 'ساعات إضافية' : 'Heures sup.', count: 8, icon: <CreditCard size={18} className="text-blue-500" /> },
                { label: lang === 'ar' ? 'منح استثنائية' : 'Primes exceptionnelles', count: 4, icon: <Gift size={18} className="text-[#0d5e3f]" /> },
              ].map((cat, i) => (
                <div key={i} className={`flex items-center justify-between p-3.5 hover:bg-gray-50 dark:hover:bg-slate-900 rounded-xl cursor-pointer transition-all border border-transparent hover:border-gray-100 dark:hover:border-slate-700 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex items-center gap-3 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">{cat.icon}</div>
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{cat.label}</span>
                  </div>
                  <span className="text-[10px] font-black text-gray-400 bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bonuses;
