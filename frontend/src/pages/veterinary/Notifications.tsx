import { useState } from 'react';
import { Bell, Info, AlertTriangle, CheckCircle, Clock, Trash2 } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'تذكير بموعد تلقيح', body: 'موعد تلقيح فوج الدواجن 4 غداً في ضيعة النخيل.', time: 'منذ ساعة', type: 'warning', read: false },
    { id: 2, title: 'تمت الموافقة على العطلة', body: 'تمت الموافقة على طلب العطلة الإدارية الخاصة بك.', time: 'منذ 3 ساعات', type: 'success', read: false },
    { id: 3, title: 'تقرير صحي جديد', body: 'يجب مراجعة الحالة الصحية للبقرة 01 في أقرب وقت.', time: 'منذ يوم', type: 'info', read: true },
  ]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-slide-up">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">تنبيهات النظام</h1>
        <button className="text-[10px] font-black text-emerald-700 uppercase tracking-widest hover:underline">تحديد الكل كمقروء</button>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="divide-y divide-gray-100">
           {notifications.map((notif) => (
             <div key={notif.id} className={`p-6 flex gap-5 group transition-all ${notif.read ? 'bg-white opacity-70' : 'bg-emerald-50/30'}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                   notif.type === 'warning' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                   notif.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                   'bg-blue-50 border-blue-100 text-blue-600'
                }`}>
                   {notif.type === 'warning' ? <AlertTriangle size={20} /> : notif.type === 'success' ? <CheckCircle size={20} /> : <Info size={20} />}
                </div>
                <div className="flex-1">
                   <div className="flex justify-between items-start mb-1">
                      <h4 className={`font-bold text-gray-800 ${notif.read ? 'text-gray-600' : 'text-emerald-900'}`}>{notif.title}</h4>
                      <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1 uppercase tracking-widest">
                         <Clock size={12} /> {notif.time}
                      </span>
                   </div>
                   <p className="text-sm text-gray-500 leading-relaxed font-medium">{notif.body}</p>
                   
                   <div className="mt-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="text-[10px] font-black text-emerald-700 uppercase tracking-widest hover:underline">عرض التفاصيل</button>
                      <button className="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:underline">حذف</button>
                   </div>
                </div>
                {!notif.read && <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 animate-pulse"></div>}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
