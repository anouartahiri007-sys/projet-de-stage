import { Bell, Check, Trash2, Calendar, Shield, Wallet, MessageSquare } from 'lucide-react';

const Notifications = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">الإشعارات</h1>
          <p className="text-sm text-gray-500 mt-1">تنبيهات وتحديثات حسابك المهني</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all">
              <Check size={16} className="text-emerald-600" />
              تحديد الكل كمقروء
           </button>
           <button className="p-2 bg-white border border-gray-200 text-rose-600 rounded-xl hover:bg-rose-50 transition-all">
              <Trash2 size={18} />
           </button>
        </div>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="divide-y divide-gray-50">
           {[
              { title: 'تم تأكيد موعد جديد للمريضة فاطمة الزهراء الإدريسي', time: 'منذ 10 دقائق', type: 'appointment', unread: true },
              { title: 'تم صرف راتب شهر أبريل 2024. يمكنك الاطلاع على الكشف الآن.', time: 'منذ يوم واحد', type: 'salary', unread: false },
              { title: 'تمت الموافقة على طلب العطلة السنوية الخاص بك.', time: 'منذ يومين', type: 'leave', unread: false },
              { title: 'تنبيه: أنت مؤهل للترقية في الرتبة القادمة.', time: 'منذ 3 أيام', type: 'admin', unread: false },
              { title: 'ملاحظة جديدة من الإدارة بخصوص تقييم الأداء السنوي.', time: 'منذ أسبوع', type: 'evaluation', unread: false },
           ].map((notif, i) => (
              <div key={i} className={`p-6 flex gap-6 hover:bg-gray-50/80 transition-all cursor-pointer relative group ${notif.unread ? 'bg-emerald-50/20' : ''}`}>
                 {notif.unread && <div className="absolute right-0 top-0 bottom-0 w-1 bg-emerald-600"></div>}
                 
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    notif.type === 'appointment' ? 'bg-blue-50 text-blue-600' :
                    notif.type === 'salary' ? 'bg-emerald-50 text-emerald-600' :
                    notif.type === 'leave' ? 'bg-purple-50 text-purple-600' :
                    notif.type === 'admin' ? 'bg-amber-50 text-amber-600' :
                    'bg-gray-50 text-gray-600'
                 }`}>
                    {notif.type === 'appointment' && <Calendar size={22} />}
                    {notif.type === 'salary' && <Wallet size={22} />}
                    {notif.type === 'leave' && <CheckCircle size={22} />}
                    {notif.type === 'admin' && <Shield size={22} />}
                    {notif.type === 'evaluation' && <MessageSquare size={22} />}
                 </div>

                 <div className="flex-1 space-y-1">
                    <h3 className={`text-sm font-bold ${notif.unread ? 'text-gray-800' : 'text-gray-600'}`}>{notif.title}</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{notif.time}</p>
                 </div>

                 <button className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-rose-600 transition-all">
                    <Trash2 size={16} />
                 </button>
              </div>
           ))}
        </div>
        
        <div className="p-4 bg-gray-50/30 border-t border-gray-50 flex justify-center">
           <button className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] hover:text-emerald-700 transition-all">تحميل الإشعارات السابقة</button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
