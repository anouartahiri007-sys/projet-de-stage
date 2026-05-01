import { useState } from 'react';
import { Calendar, Plus, Clock, CheckCircle, XCircle, FileText, Download, Send } from 'lucide-react';

const Leaves = () => {
  const [tab, setTab] = useState<'requests' | 'history'>('requests');

  return (
    <div className="space-y-6 animate-slide-up pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">العطل والغيابات</h1>
          <p className="text-sm text-gray-500 mt-1">إدارة طلبات الرخص والغيابات المبررة</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md text-sm">
          <Plus size={18} />
          طلب رخصة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'الرصيد السنوي', value: '22 يوم', color: 'emerald' },
          { label: 'الرصيد المستهلك', value: '08 أيام', color: 'blue' },
          { label: 'الرصيد المتبقي', value: '14 يوم', color: 'purple' },
        ].map((kpi, i) => (
          <div key={i} className="gov-card p-6 flex flex-col items-center text-center">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{kpi.label}</p>
             <p className="text-2xl font-black text-gray-800">{kpi.value}</p>
             <div className="w-full h-1.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
                <div className={`h-full bg-emerald-500 rounded-full`} style={{ width: '40%' }}></div>
             </div>
          </div>
        ))}
      </div>

      <div className="gov-card overflow-hidden">
        <div className="flex border-b border-gray-100 bg-gray-50/30">
          <button 
            onClick={() => setTab('requests')}
            className={`px-8 py-4 text-xs font-black uppercase tracking-widest transition-all relative ${tab === 'requests' ? 'text-emerald-700' : 'text-gray-400 hover:text-gray-600'}`}
          >
            الطلبات الحالية
            {tab === 'requests' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setTab('history')}
            className={`px-8 py-4 text-xs font-black uppercase tracking-widest transition-all relative ${tab === 'history' ? 'text-emerald-700' : 'text-gray-400 hover:text-gray-600'}`}
          >
            سجل العطل
            {tab === 'history' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 rounded-t-full"></div>}
          </button>
        </div>

        <div className="p-0">
          {tab === 'requests' ? (
            <div className="divide-y divide-gray-50">
              {[
                { type: 'رخصة إدارية', from: '2024-06-01', to: '2024-06-15', duration: '15 يوم', status: 'pending' },
              ].map((req, i) => (
                <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Clock size={20} /></div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{req.type}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">من {req.from} إلى {req.to}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-bold text-gray-700">{req.duration}</span>
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-black uppercase border border-amber-100">قيد الدراسة</span>
                    <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="إلغاء الطلب"><XCircle size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
               {[
                { type: 'رخصة إدارية', from: '2024-01-10', to: '2024-01-15', duration: '5 أيام', status: 'approved' },
                { type: 'رخصة استثنائية', from: '2023-11-20', to: '2023-11-22', duration: 'يومين', status: 'approved' },
              ].map((req, i) => (
                <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><CheckCircle size={20} /></div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{req.type}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">من {req.from} إلى {req.to}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-bold text-gray-700">{req.duration}</span>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase border border-emerald-100">تمت الموافقة</span>
                    <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="تحميل المقرر"><Download size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaves;
