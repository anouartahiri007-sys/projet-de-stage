import { useState } from 'react';
import { useLang } from '../context/LangContext';
import { Info, CheckCircle, AlertTriangle, Bell, Clock, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const MOCK_NOTIFS = (t: any) => [
  { id: 1, title: t('notifNewConcours') || 'Nouveau concours publié', desc: t('notifNewConcoursDesc') || 'Le concours pour le poste de Technicien de Santé est désormais ouvert aux candidatures.', type: 'info', date: t('minutesAgo').replace('{n}', '10'), unread: true },
  { id: 2, title: t('notifAppAccepted') || 'Candidature acceptée', desc: t('notifAppAcceptedDesc') || 'Félicitations ! Votre candidature pour le poste de Médecin a été présélectionnée.', type: 'success', date: t('hoursAgo').replace('{n}', '2'), unread: true },
  { id: 3, title: t('notifClosingSoon') || 'Rappel : Clôture imminente', desc: t('notifClosingSoonDesc') || 'Le concours de recrutement d\'Ingénieurs se clôture dans 24 heures.', type: 'warning', date: t('yesterday'), unread: false },
  { id: 4, title: t('notifMaintenance') || 'Mise à jour du système', desc: t('notifMaintenanceDesc') || 'La plateforme sera en maintenance ce soir à partir de 22:00.', type: 'info', date: t('daysAgo').replace('{n}', '2'), unread: false },
];

export default function Notifications() {
  const { t, lang } = useLang();
  const [notifs, setNotifs] = useState(MOCK_NOTIFS(t));

  const NOTIF_STYLES = {
    info: { icon: <Info size={18} />, bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
    success: { icon: <CheckCircle size={18} />, bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
    warning: { icon: <AlertTriangle size={18} />, bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
  };

  const deleteNotif = (id: number) => {
    setNotifs(notifs.filter(n => n.id !== id));
    toast.success(t('notifDeleted'));
  };

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, unread: false })));
    toast.success(t('allMarkedRead'));
  };

  return (
    <div className="animate-slide-up space-y-6 pb-12" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-3xl font-black text-[#1E3E6E] dark:text-white tracking-tight">{t('notifications')}</h1>
          <p className="text-slate-500 mt-1 font-medium italic">{t('notificationsDesc')}</p>
        </div>
        <button 
          onClick={markAllRead}
          className="text-xs font-black text-[#3466A4] hover:underline uppercase tracking-widest"
        >
          {t('markAllRead')}
        </button>
      </div>

      <div className="gov-card overflow-hidden">
        {notifs.length === 0 ? (
          <div className="p-20 text-center">
            <Bell size={48} className="mx-auto text-slate-100 mb-4" />
            <p className="text-slate-500 font-bold">{t('upToDate')}</p>
            <p className="text-xs text-slate-400 mt-1">{t('noNotifications')}</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {notifs.map(notif => {
              const style = NOTIF_STYLES[notif.type as keyof typeof NOTIF_STYLES] || NOTIF_STYLES.info;
              return (
                <div key={notif.id} className={`p-6 flex gap-6 hover:bg-slate-50/50 transition-colors relative group ${notif.unread ? 'bg-white' : 'opacity-70'} ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  {notif.unread && <div className={`absolute top-0 ${lang === 'ar' ? 'right-0' : 'left-0'} bottom-0 w-1 bg-[#1E3E6E]`} />}
                  
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${style.bg} ${style.text} ${style.border}`}>
                    {style.icon}
                  </div>

                  <div className={`flex-1 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    <div className={`flex items-center justify-between mb-1 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                      <h3 className="font-bold text-slate-800 dark:text-white">{notif.title}</h3>
                      <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                        <Clock size={12} /> {notif.date}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{notif.desc}</p>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button 
                      onClick={() => deleteNotif(notif.id)}
                      className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
