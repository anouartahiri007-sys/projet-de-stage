import { useState } from 'react';
import { Bell, Check, Trash2, Clock, Info, AlertTriangle, CheckCircle } from 'lucide-react';

const mockNotifications = [
  { id: 1, title: 'طلب عطلة جديد', body: 'قدمت فاطمة الزهراء الإدريسي طلباً لعطلة سنوية لمدة 5 أيام.', time: 'منذ 10 دقائق', type: 'info', read: false },
  { id: 2, title: 'تم توقيع قرار إداري', body: 'تم إصدار قرار التعيين الخاص بالموظف ياسين بومدين.', time: 'منذ ساعة', type: 'success', read: false },
  { id: 3, title: 'تنبيه: رصيد عطل منخفض', body: 'الموظف أحمد العلوي استنفذ 90% من رصيده السنوي.', time: 'منذ ساعتين', type: 'warning', read: true },
  { id: 4, title: 'موعد تقييم الأداء', body: 'تبدأ دورة تقييم الأداء السنوية لعام 2024 في الأول من يونيو.', time: 'منذ يوم', type: 'info', read: true },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotif = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-6 animate-slide-up max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">الإشعارات</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الوثائق والإشعارات / مركز التنبيهات</p>
        </div>
        <button 
          onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
          className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
        >
          <Check size={14} />
          تحديد الكل كمقروء
        </button>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div key={notif.id} className={`p-6 transition-all flex gap-5 group ${notif.read ? 'bg-white opacity-80' : 'bg-emerald-50/30'}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm ${
                  notif.type === 'info' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  notif.type === 'warning' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                  'bg-emerald-50 text-emerald-600 border-emerald-100'
                }`}>
                  {notif.type === 'info' ? <Info size={22} /> :
                   notif.type === 'warning' ? <AlertTriangle size={22} /> :
                   <CheckCircle size={22} />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-bold text-gray-800 ${notif.read ? 'text-gray-600' : 'text-emerald-900'}`}>{notif.title}</h3>
                    <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                      <Clock size={12} />
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">{notif.body}</p>
                  
                  <div className="mt-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!notif.read && (
                      <button 
                        onClick={() => markAsRead(notif.id)}
                        className="text-[11px] font-black text-emerald-700 uppercase tracking-widest hover:underline"
                      >
                        تعليم كمقروء
                      </button>
                    )}
                    <button 
                      onClick={() => deleteNotif(notif.id)}
                      className="text-[11px] font-black text-rose-600 uppercase tracking-widest hover:underline"
                    >
                      حذف الإشعار
                    </button>
                  </div>
                </div>

                {!notif.read && (
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 animate-pulse"></div>
                )}
              </div>
            ))
          ) : (
            <div className="p-20 text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-200">
                <Bell size={40} />
              </div>
              <p className="font-bold text-gray-400">لا توجد إشعارات جديدة</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
