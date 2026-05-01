import { useState, useEffect } from 'react';
import { CalendarDays, Check, X, Search, Filter, Clock } from 'lucide-react';
import { api } from '../../lib/api';
import toast from 'react-hot-toast';

const LeaveRequests = () => {
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
      toast.error('Erreur lors du chargement des demandes');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: 'approved' | 'rejected') => {
    try {
      await api.patch(`/leaves/${id}/status`, { status });
      toast.success(status === 'approved' ? 'Demande approuvée' : 'Demande rejetée');
      fetchLeaves();
    } catch (error) {
      toast.error('Erreur de mise à jour');
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">طلبات العطل</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / إدارة العطل / طلبات العطل</p>
        </div>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:w-80">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث عن طلب..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
              <Filter size={16} />
              كل الحالات
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {loading ? (
             <div className="p-8 text-center text-gray-500">جاري التحميل...</div>
          ) : leaveRequests.length === 0 ? (
             <div className="p-8 text-center text-gray-500">لا توجد طلبات عطل حاليا.</div>
          ) : (
          leaveRequests.filter(r => r.fonctionnaire?.user?.name?.includes(searchTerm) || '').map((request) => (
            <div key={request.id} className="p-6 hover:bg-gray-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center border-2 border-white shadow-sm text-gray-400 font-bold">
                  {request.fonctionnaire?.user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-base">{request.fonctionnaire?.user?.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      request.type === 'annual' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      request.type === 'sick' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                      {request.type}
                    </span>
                    <span className="text-[11px] text-gray-400 font-bold flex items-center gap-1">
                      <Clock size={12} />
                      تاريخ النهاية: {request.end_date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">تاريخ البدء</p>
                  <p className="text-sm font-bold text-gray-700">{request.start_date}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  {request.status === 'pending' ? (
                    <>
                      <button onClick={() => handleUpdateStatus(request.id, 'approved')} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-100">
                        <Check size={14} />
                        قبول
                      </button>
                      <button onClick={() => handleUpdateStatus(request.id, 'rejected')} className="flex items-center gap-1.5 px-4 py-2 bg-white border border-rose-200 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-50 transition-all">
                        <X size={14} />
                        رفض
                      </button>
                    </>
                  ) : (
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                      request.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {request.status === 'approved' ? 'تم القبول' : 'تم الرفض'}
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

