import { useState } from 'react';
import { CalendarDays, Check, X, Search, Filter, Clock } from 'lucide-react';

const mockLeaveRequests = [
  { id: 1, name: 'فاطمة الزهراء الإدريسي', type: 'سنوية', status: 'pending', duration: '5 أيام', start: '2024-05-20', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
  { id: 2, name: 'أحمد العلوي', type: 'إدارية', status: 'approved', duration: '2 أيام', start: '2024-05-15', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
  { id: 3, name: 'محمد أمين الناصري', type: 'مرضية', status: 'pending', duration: '3 أيام', start: '2024-05-22', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
  { id: 4, name: 'سمية آيت الطالب', type: 'سنوية', status: 'rejected', duration: '10 أيام', start: '2024-06-01', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80' },
];

const LeaveRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');

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
          {mockLeaveRequests.filter(r => r.name.includes(searchTerm)).map((request) => (
            <div key={request.id} className="p-6 hover:bg-gray-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img src={request.img} alt={request.name} className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm" />
                <div>
                  <h3 className="font-bold text-gray-800 text-base">{request.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      request.type === 'سنوية' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      request.type === 'مرضية' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                      {request.type}
                    </span>
                    <span className="text-[11px] text-gray-400 font-bold flex items-center gap-1">
                      <Clock size={12} />
                      {request.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">تاريخ البدء</p>
                  <p className="text-sm font-bold text-gray-700">{request.start}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  {request.status === 'pending' ? (
                    <>
                      <button className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-100">
                        <Check size={14} />
                        قبول
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-rose-200 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-50 transition-all">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveRequests;
