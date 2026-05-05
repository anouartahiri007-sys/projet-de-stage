import { useState } from 'react';
import { ScrollText, Download, FileText, Calendar, ChevronRight } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const mockPayments = [
  { id: 1, month: 'ماي 2024', monthFr: 'Mai 2024', date: '2024-05-25', total: '1,248,000', status: 'processing', employees: 248 },
  { id: 2, month: 'أبريل 2024', monthFr: 'Avril 2024', date: '2024-04-26', total: '1,242,500', status: 'completed', employees: 246 },
  { id: 3, month: 'مارس 2024', monthFr: 'Mars 2024', date: '2024-03-27', total: '1,238,000', status: 'completed', employees: 245 },
];

const PaymentHistory = () => {
  const { t, lang } = useLang();
  const [selectedYear, setSelectedYear] = useState('2024');

  return (
    <div className="animate-slide-up space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <div className="flex gap-2">
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 px-4 py-2.5 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-[#0d5e3f] shadow-sm"
          >
            <option value="2024">{lang === 'ar' ? 'سنة 2024' : 'Année 2024'}</option>
            <option value="2023">{lang === 'ar' ? 'سنة 2023' : 'Année 2023'}</option>
          </select>
        </div>
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('paymentHistory')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('salaries')} / {t('paymentHistory')}</p>
        </div>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className={`p-6 border-b border-gray-100 dark:border-slate-700 bg-gray-50/30 dark:bg-slate-900/30 flex items-center justify-between ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
          <h2 className="font-black text-xs text-gray-800 dark:text-white flex items-center gap-2 uppercase tracking-widest">
            <ScrollText size={22} className="text-[#0d5e3f]" />
            {lang === 'ar' ? 'أرشيف الدفع الشهري' : 'Archive des paiements'}
          </h2>
        </div>

        <div className="divide-y divide-gray-50 dark:divide-slate-700">
          {mockPayments.map((payment) => (
            <div key={payment.id} className={`p-6 hover:bg-gray-50/50 dark:hover:bg-slate-700/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center gap-5 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-16 h-16 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 text-[#0d5e3f] rounded-2xl flex flex-col items-center justify-center shadow-sm group-hover:border-[#0d5e3f] transition-all">
                  <Calendar size={20} className="mb-0.5" />
                  <span className="text-[10px] font-black uppercase">{(lang === 'ar' ? payment.month : payment.monthFr).split(' ')[0]}</span>
                </div>
                <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                  <h3 className="font-extrabold text-gray-800 dark:text-white text-lg">{lang === 'ar' ? payment.month : payment.monthFr}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{lang === 'ar' ? 'تاريخ الإصدار' : 'Émis le'}: {payment.date}</p>
                </div>
              </div>

              <div className={`flex flex-wrap items-center gap-8 md:gap-16 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{lang === 'ar' ? 'إجمالي المبلغ' : 'Montant Total'}</p>
                  <p className="text-xl font-black text-[#0d5e3f]">{payment.total} DH</p>
                </div>
                <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{lang === 'ar' ? 'الموظفون' : 'Employés'}</p>
                  <p className="text-xl font-black text-gray-700 dark:text-gray-200">{payment.employees}</p>
                </div>
                <div className={`flex flex-col ${lang === 'ar' ? 'items-end' : 'items-start'}`}>
                  <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border ${
                    payment.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100 animate-pulse'
                  }`}>
                    {payment.status === 'completed' ? (lang === 'ar' ? 'تم التنفيذ' : 'Complété') : (lang === 'ar' ? 'قيد المعالجة' : 'En cours')}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-300 hover:text-[#0d5e3f] hover:bg-emerald-50 rounded-xl transition-all">
                      <Download size={20} />
                    </button>
                    <button className="p-2 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                      <FileText size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50/50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-700 text-center">
          <button className="text-xs font-black uppercase tracking-[0.2em] text-[#0d5e3f] hover:underline flex items-center gap-2 mx-auto transition-all">
            {lang === 'ar' ? 'عرض المزيد من الأرشيف' : 'Voir plus d\'archives'}
            <ChevronRight size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
