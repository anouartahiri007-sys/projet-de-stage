import { useState } from 'react';
import { Calendar, Plus, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Leaves = () => {
  const [requests, setRequests] = useState([
    { id: 1, type: 'سنوية', duration: '15 يوم', date: '2024-07-01', status: 'pending' },
    { id: 2, type: 'إدارية', duration: '2 يوم', date: '2024-05-10', status: 'approved' },
    { id: 3, type: 'مرضية', duration: '3 يوم', date: '2024-03-15', status: 'approved' },
  ]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-slide-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">العطل والغيابات</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الفضاء الشخصي / طلبات العطل</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md text-sm">
          <Plus size={18} />
          طلب عطلة جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Balance Card */}
        <div className="md:col-span-1">
           <div className="gov-card p-6 text-center">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-sm">
                 <Calendar size={28} />
              </div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">الرصيد المتبقي</h3>
              <p className="text-3xl font-black text-gray-800">12 <span className="text-sm opacity-30">يوم</span></p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                 <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                    <span className="text-gray-400">المستهلك</span>
                    <span className="text-emerald-600">10 / 22</span>
                 </div>
                 <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '45%' }}></div>
                 </div>
              </div>
           </div>
        </div>

        {/* Request History */}
        <div className="md:col-span-3">
           <div className="gov-card p-0 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/30">
                 <h3 className="font-bold text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <Clock size={18} className="text-emerald-600" />
                    تاريخ الطلبات
                 </h3>
              </div>
              <div className="divide-y divide-gray-50">
                 {requests.map((req) => (
                    <div key={req.id} className="p-6 hover:bg-gray-50/50 transition-all flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl border ${
                             req.type === 'سنوية' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-blue-50 border-blue-100 text-blue-600'
                          }`}>
                             <Calendar size={20} />
                          </div>
                          <div>
                             <h4 className="font-bold text-gray-800 text-sm">عطلة {req.type}</h4>
                             <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">{req.duration} | ابتداءً من {req.date}</p>
                          </div>
                       </div>
                       <div>
                          {req.status === 'pending' ? (
                             <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[9px] font-black uppercase border border-amber-100">
                                <Clock size={12} /> قيد المعالجة
                             </span>
                          ) : req.status === 'approved' ? (
                             <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[9px] font-black uppercase border border-emerald-100">
                                <CheckCircle size={12} /> تم القبول
                             </span>
                          ) : (
                             <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-[9px] font-black uppercase border border-rose-100">
                                <XCircle size={12} /> تم الرفض
                             </span>
                          )}
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Leaves;
