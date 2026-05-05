import { useState, useEffect } from 'react';
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';
import { api } from '../../lib/api';
import toast from 'react-hot-toast';
import { useLang } from '../../context/LangContext';

const Salaries = () => {
  const { t, lang } = useLang();
  const [searchTerm, setSearchTerm] = useState('');
  const [payrolls, setPayrolls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/payrolls');
      setPayrolls(data);
    } catch (error) {
      toast.error(t('error'));
    } finally {
      setLoading(false);
    }
  };

  const totalNet = payrolls.reduce((acc, p) => acc + Number(p.net_salary), 0);
  const totalBonuses = payrolls.reduce((acc, p) => acc + Number(p.bonuses), 0);
  const totalDeductions = payrolls.reduce((acc, p) => acc + Number(p.deductions), 0);

  return (
    <div className="animate-slide-up space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <button className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-sm shadow-sm">
          <Download size={18} className="text-[#0d5e3f]" />
          {t('downloadRegistry')}
        </button>
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('salaries')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('salaries')} / {t('salaries')}</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: t('monthlyPayroll'), value: totalNet, color: 'emerald', trend: '+2%' },
          { label: t('bonuses'), value: totalBonuses, color: 'blue', trend: '+5%' },
          { label: t('totalDeductions'), value: totalDeductions, color: 'rose', trend: '-1%' },
        ].map((stat, i) => (
          <div key={i} className={`gov-card p-6 border-b-4 border-${stat.color}-500 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
            <div className={`flex items-center justify-between ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
              <h3 className="text-2xl font-black text-gray-800 dark:text-white">{stat.value.toLocaleString()} <span className="text-xs font-bold text-gray-400">DH</span></h3>
              <span className={`text-[10px] font-black ${stat.trend.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'} px-2 py-1 rounded-lg flex items-center gap-1`}>
                {stat.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </span>
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
                <th className="p-5">{t('salaryBase')}</th>
                <th className="p-5">{t('bonuses')} (+)</th>
                <th className="p-5">{t('deductions')} (-)</th>
                <th className="p-5">{t('netPay')}</th>
                <th className="p-5 text-center">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {loading ? (
                <tr><td colSpan={6} className="p-20 text-center text-gray-500"><Loader2 className="animate-spin mx-auto text-[#0d5e3f] mb-4" size={48} /><p className="font-bold text-[10px] uppercase tracking-widest">{t('loading')}</p></td></tr>
              ) : payrolls.length === 0 ? (
                <tr><td colSpan={6} className="p-20 text-center text-gray-500"><p className="font-bold text-gray-400">{t('noData')}</p></td></tr>
              ) : (
                payrolls.filter(p => p.fonctionnaire?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/50 transition-colors group">
                    <td className="p-5">
                      <span className="font-bold text-gray-800 dark:text-white">{item.fonctionnaire?.user?.name}</span>
                    </td>
                    <td className="p-5 font-bold text-gray-400">{Number(item.base_salary).toLocaleString()} DH</td>
                    <td className="p-5 font-black text-emerald-600">+{Number(item.bonuses).toLocaleString()} DH</td>
                    <td className="p-5 font-black text-rose-500">-{Number(item.deductions).toLocaleString()} DH</td>
                    <td className="p-5">
                      <span className="px-4 py-2 bg-emerald-50 text-[#0d5e3f] rounded-xl font-black text-sm border border-emerald-100">
                        {Number(item.net_salary).toLocaleString()} DH
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <button className="p-2 text-slate-300 hover:text-[#0d5e3f] hover:bg-emerald-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Salaries;
