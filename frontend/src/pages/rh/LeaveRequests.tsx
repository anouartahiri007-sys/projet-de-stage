import { useState, useEffect } from 'react';
import { Check, X, Search, Filter, Clock, Loader2, CalendarDays } from 'lucide-react';
import { api } from '../../lib/api';
import toast from 'react-hot-toast';
import { useLang } from '../../context/LangContext';

const LeaveRequests = () => {
  const { t, lang } = useLang();
  const [searchTerm, setSearchTerm] = useState('');
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/leaves');
      setLeaveRequests(data);
    } catch (error) {
      toast.error(t('error'));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: 'approved' | 'rejected') => {
    try {
      await api.patch(`/leaves/${id}/status`, { status });
      toast.success(status === 'approved' ? t('success') : t('success'));
      fetchLeaves();
    } catch (error) {
      toast.error(t('error'));
    }
  };

  return (
    <div className="animate-slide-up space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('leaveRequests')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('leaveManagement')} / {t('leaveRequests')}</p>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className={`p-6 border-b border-gray-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30 dark:bg-slate-900/30 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
          <div className="relative w-full md:w-80">
            <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={18} />
            <input 
              type="text" 
              placeholder={lang === 'ar' ? 'ابحث عن طلب...' : 'Rechercher une demande...'} 
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

        <div className="divide-y divide-gray-100 dark:divide-slate-700">
          {loading ? (
             <div className="p-20 text-center text-gray-500">
               <Loader2 className="animate-spin mx-auto text-[#0d5e3f] mb-4" size={48} />
               <p className="font-bold uppercase tracking-widest text-[10px]">{t('loading')}</p>
             </div>
          ) : leaveRequests.length === 0 ? (
             <div className="p-20 text-center text-gray-500">
               <CalendarDays size={48} className="mx-auto text-slate-200 mb-4" />
               <p className="font-bold">{t('noData')}</p>
             </div>
          ) : (
          leaveRequests.filter(r => r.fonctionnaire?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())).map((request) => (
            <div key={request.id} className={`p-6 hover:bg-gray-50/50 dark:hover:bg-slate-700/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center gap-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0d5e3f] flex items-center justify-center border-2 border-white shadow-sm font-bold shrink-0">
                  {request.fonctionnaire?.user?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-white text-base">{request.fonctionnaire?.user?.name}</h3>
                  <div className={`flex items-center gap-3 mt-1 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                      request.type === 'annual' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      request.type === 'sick' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                      {request.type}
                    </span>
                    <span className="text-[11px] text-gray-400 font-bold flex items-center gap-1">
                      <Clock size={12} />
                      {t('endDate')}: {request.end_date}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`flex items-center gap-8 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t('startDate')}</p>
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{request.start_date}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  {request.status === 'pending' ? (
                    <>
                      <button onClick={() => handleUpdateStatus(request.id, 'approved')} className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0d5e3f] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0a4a31] transition-all shadow-lg shadow-emerald-900/10 active:scale-95">
                        <Check size={14} />
                        {lang === 'ar' ? 'قبول' : 'Approuver'}
                      </button>
                      <button onClick={() => handleUpdateStatus(request.id, 'rejected')} className="flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-slate-800 border border-rose-200 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all active:scale-95">
                        <X size={14} />
                        {lang === 'ar' ? 'رفض' : 'Rejeter'}
                      </button>
                    </>
                  ) : (
                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                      request.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {request.status === 'approved' ? (lang === 'ar' ? 'تم القبول' : 'Approuvée') : (lang === 'ar' ? 'تم الرفض' : 'Rejetée')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveRequests;
