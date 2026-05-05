import { useState } from 'react';
import { Bell, Check, Trash2, Clock, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const mockNotifications = (lang: string) => [
  { id: 1, title: lang === 'ar' ? 'طلب عطلة جديد' : 'Nouveau Congé', body: lang === 'ar' ? 'قدمت فاطمة الزهراء الإدريسي طلباً لعطلة سنوية لمدة 5 أيام.' : 'Fatima Zahra a soumis une demande de congé annuel de 5 jours.', time: lang === 'ar' ? 'منذ 10 دقائق' : 'Il y a 10 min', type: 'info', read: false },
  { id: 2, title: lang === 'ar' ? 'تم توقيع قرار إداري' : 'Décision Signée', body: lang === 'ar' ? 'تم إصدار قرار التعيين الخاص بالموظف ياسين بومدين.' : 'La décision de recrutement de Yassine Boumdien a été émise.', time: lang === 'ar' ? 'منذ ساعة' : 'Il y a 1h', type: 'success', read: false },
];

const NotificationsPage = () => {
  const { t, lang } = useLang();
  const [notifications, setNotifications] = useState(mockNotifications(lang));

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotif = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="animate-slide-up space-y-6 max-w-5xl mx-auto" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <button 
          onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
          className="text-[10px] font-black uppercase tracking-widest text-[#0d5e3f] hover:underline flex items-center gap-2"
        >
          <Check size={16} />
          {lang === 'ar' ? 'تحديد الكل كمقروء' : 'Tout marquer comme lu'}
        </button>
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{lang === 'ar' ? 'الإشعارات' : 'Notifications'}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('adminDocuments')} / {lang === 'ar' ? 'مركز التنبيهات' : 'Centre d\'alertes'}</p>
        </div>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="divide-y divide-gray-100 dark:divide-slate-700">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div key={notif.id} className={`p-8 transition-all flex gap-6 group ${notif.read ? 'bg-white dark:bg-slate-800/50 opacity-60' : 'bg-emerald-50/20 dark:bg-emerald-900/10'}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 shadow-sm ${
                  notif.type === 'info' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  notif.type === 'warning' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                  'bg-emerald-50 text-emerald-600 border-emerald-100'
                }`}>
                  {notif.type === 'info' ? <Info size={26} /> :
                   notif.type === 'warning' ? <AlertTriangle size={26} /> :
                   <CheckCircle size={26} />}
                </div>
                
                <div className="flex-1">
                  <div className={`flex items-center justify-between mb-2 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <h3 className={`text-lg font-black ${notif.read ? 'text-gray-600 dark:text-gray-400' : 'text-[#0d5e3f] dark:text-emerald-400'} uppercase tracking-tight`}>{notif.title}</h3>
                    <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1.5 uppercase tracking-widest">
                      <Clock size={14} />
                      {notif.time}
                    </span>
                  </div>
                  <p className={`text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-bold ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{notif.body}</p>
                  
                  <div className={`mt-6 flex gap-6 opacity-0 group-hover:opacity-100 transition-all ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    {!notif.read && (
                      <button 
                        onClick={() => markAsRead(notif.id)}
                        className="text-[10px] font-black text-[#0d5e3f] uppercase tracking-[0.2em] hover:underline"
                      >
                        {lang === 'ar' ? 'تعليم كمقروء' : 'Marquer comme lu'}
                      </button>
                    )}
                    <button 
                      onClick={() => deleteNotif(notif.id)}
                      className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em] hover:underline"
                    >
                      {lang === 'ar' ? 'حذف الإشعار' : 'Supprimer'}
                    </button>
                  </div>
                </div>

                {!notif.read && (
                  <div className="w-2.5 h-2.5 bg-[#0d5e3f] rounded-full mt-3 animate-pulse shadow-[0_0_10px_rgba(13,94,63,0.5)]"></div>
                )}
              </div>
            ))
          ) : (
            <div className="p-32 text-center space-y-6">
              <div className="w-24 h-24 bg-gray-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto text-gray-200 dark:text-slate-700 shadow-inner">
                <Bell size={48} />
              </div>
              <div className="space-y-2">
                <p className="font-black text-gray-400 uppercase tracking-widest">{lang === 'ar' ? 'لا توجد إشعارات جديدة' : 'Aucune notification'}</p>
                <p className="text-xs text-gray-300 font-bold">{lang === 'ar' ? 'سيتم إشعارك عند وجود أي تحديثات إدارية جديدة.' : 'Vous serez notifié des mises à jour administratives.'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
