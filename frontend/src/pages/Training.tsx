import { useState } from 'react';
import { useLang } from '../context/LangContext';
import { 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle, 
  GraduationCap, 
  BookOpen, 
  MapPin 
} from 'lucide-react';

const FORMATIONS = (t: any) => [
  { id: 1, title: t('intensiveCareTraining') || 'Formation en soins intensifs', category: t('medicine'), duration: '3 jours', date: '2025-05-15', participants: 12, status: 'planifie', lieu: 'Centre Hospitalier Larache' },
  { id: 2, title: t('hygieneSecurityTraining') || 'Hygiène et sécurité sanitaire', category: t('publicHealth'), duration: '1 jour', date: '2025-04-28', participants: 8, status: 'en_cours', lieu: 'Salle de formation — Commune' },
  { id: 3, title: t('vetLegislationTraining') || 'Législation vétérinaire marocaine', category: t('veterinary'), duration: '2 jours', date: '2025-03-10', participants: 5, status: 'termine', lieu: 'ONSSA Larache' },
  { id: 4, title: t('adminManagementTraining') || 'Gestion administrative & RH', category: t('administration'), duration: '4 jours', date: '2025-06-02', participants: 15, status: 'planifie', lieu: 'Commune de Larache — Bâtiment A' },
];

export default function Training() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState('tous');

  const STATUS_MAP = {
    planifie: { label: t('planned'), cls: 'bg-blue-50 text-blue-700 border-blue-100' },
    en_cours: { label: t('inProgress'), cls: 'bg-amber-50 text-amber-700 border-amber-100' },
    termine: { label: t('completed'), cls: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  };

  return (
    <div className="animate-slide-up space-y-6 pb-12" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-3xl font-extrabold text-[#1E3E6E] dark:text-white font-heading">{t('trainingAndDev')}</h1>
          <p className="text-slate-500 mt-1 font-medium">{t('trainingDesc')}</p>
        </div>
        <button className="bg-[#0d5e3f] hover:bg-[#0a4a31] text-white flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-900/10 active:scale-95 transition-all">
          <Plus size={18} /> {t('newTraining')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('plannedTrainings'), value: FORMATIONS(t).filter(f => f.status === 'planifie').length, icon: <Calendar size={20} className="text-blue-500" />, bg: 'bg-blue-50' },
          { label: t('inProgress'), value: FORMATIONS(t).filter(f => f.status === 'en_cours').length, icon: <Clock size={20} className="text-amber-500" />, bg: 'bg-amber-50' },
          { label: t('completed'), value: FORMATIONS(t).filter(f => f.status === 'termine').length, icon: <CheckCircle size={20} className="text-emerald-500" />, bg: 'bg-emerald-50' },
          { label: t('successRate'), value: '98%', icon: <GraduationCap size={20} className="text-purple-500" />, bg: 'bg-purple-50' },
        ].map((kpi, i) => (
          <div key={i} className={`gov-card p-6 flex flex-col group hover:scale-[1.02] transition-transform ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className={`p-3 rounded-xl w-fit mb-4 ${kpi.bg}`}>{kpi.icon}</div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="gov-card p-6">
            <div className={`flex items-center justify-between mb-6 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t('trainingCatalogue')}</h2>
              <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
                {['tous', 'planifie', 'en_cours', 'termine'].map(s => (
                  <button 
                    key={s} 
                    onClick={() => setFilter(s)}
                    className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${filter === s ? 'bg-white text-[#1E3E6E] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {s === 'tous' ? (lang === 'ar' ? 'الكل' : 'Tous') : t(s)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {FORMATIONS(t).filter(f => filter === 'tous' || f.status === filter).map(formation => (
                <div key={formation.id} className="group border border-slate-100 rounded-2xl p-5 hover:border-blue-200 transition-all hover:bg-blue-50/10 cursor-pointer">
                  <div className={`flex flex-col md:flex-row justify-between gap-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                        <BookOpen size={22} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors">{formation.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                          <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium"><MapPin size={12} /> {formation.lieu}</span>
                          <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium"><Clock size={12} /> {formation.duration}</span>
                          <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium"><Calendar size={12} /> {formation.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center shrink-0">
                      <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${STATUS_MAP[formation.status as keyof typeof STATUS_MAP].cls}`}>
                        {STATUS_MAP[formation.status as keyof typeof STATUS_MAP].label}
                      </span>
                      <p className="text-[10px] font-bold text-slate-400 mt-2">{formation.participants} {t('agentsInscribed')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="gov-card p-6">
            <h2 className={`text-xl font-bold text-slate-800 dark:text-white mb-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('trainingRequests')}</h2>
            <div className="space-y-5">
              {[
                { name: 'Sami Alami', formation: 'Anglais technique', date: t('hoursAgo').replace('{n}', '2') },
                { name: 'Dr. Ziani', formation: 'Nouvelles normes ONSSA', date: t('hoursAgo').replace('{n}', '5') },
                { name: 'Houda Mansouri', formation: 'Excel Avancé', date: t('yesterday') }
              ].map((req, i) => (
                <div key={i} className={`flex gap-4 items-start ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white overflow-hidden shrink-0">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="" />
                  </div>
                  <div className={`flex-1 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    <p className="text-sm font-bold text-slate-800">{req.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t('nurse') || 'Technicien de santé'}</p>
                    <p className="text-xs text-slate-600 mt-1 font-medium bg-slate-50 px-2 py-1 rounded border border-slate-100 w-fit">{req.formation}</p>
                  </div>
                  <div className={`flex flex-col items-end gap-1 ${lang === 'ar' ? 'items-start' : 'items-end'}`}>
                    <span className="text-[10px] text-slate-400 font-medium">{req.date}</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 uppercase">{t('confirmed')}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-bold border-2 border-slate-100 transition-all active:scale-95">{t('manageRequests')}</button>
          </div>

          <div className="gov-card p-6 bg-gradient-to-br from-[#1E3E6E] to-[#152c4d] text-white overflow-hidden relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <h2 className={`text-lg font-bold mb-2 relative z-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('trainingGuide')}</h2>
            <p className={`text-xs text-blue-100 mb-6 relative z-10 leading-relaxed ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('trainingGuideDesc')}</p>
            <button className="w-full py-2.5 bg-white text-[#1E3E6E] rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:scale-[1.02] transition-transform relative z-10">{t('downloadPDF')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
