import { useState } from 'react';
import { Activity, UserCheck, Search, Plus, CheckCircle2 } from 'lucide-react';
import { useLang } from '../context/LangContext';

const Health = () => {
  const { t, lang } = useLang();

  const PATIENTS = [
    { id: 1, name: 'Sami Alami', type: 'Fonctionnaire', service: 'RH', last_visit: '2025-04-20', status: 'termine', motif: t('annualConsultation') },
    { id: 2, name: 'Mina El Fassi', type: 'Citoyen', service: 'Pédiatrie', last_visit: '2025-04-22', status: 'en_cours', motif: t('vaccination') },
    { id: 3, name: 'Rachid Amrani', type: 'Fonctionnaire', service: 'Technique', last_visit: '2025-04-23', status: 'attente', motif: t('minorUrgency') },
  ];

  return (
    <div className="animate-slide-up space-y-6 pb-12" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-3xl font-extrabold text-[#0d5e3f] dark:text-white font-heading">{t('healthService')}</h1>
          <p className="text-slate-500 mt-1 font-medium italic">{t('healthDesc')}</p>
        </div>
        <button className="bg-[#0d5e3f] hover:bg-[#0a4a31] text-white flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold shadow-lg shadow-emerald-900/10 transition-all active:scale-95">
          <Plus size={18} /> {t('newConsultation')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: t('consultationsDay'), value: '18', icon: <Activity size={20} className="text-emerald-500" />, bg: 'bg-emerald-50' },
          { label: t('followedAgents'), value: '412', icon: <UserCheck size={20} className="text-blue-500" />, bg: 'bg-blue-50' },
          { label: t('validatedAptitudes'), value: '94%', icon: <CheckCircle2 size={20} className="text-purple-500" />, bg: 'bg-purple-50' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:scale-[1.02] transition-transform">
            <div className={`p-4 rounded-2xl ${kpi.bg} group-hover:rotate-12 transition-transform`}>{kpi.icon}</div>
            <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className={`flex flex-col md:flex-row items-center justify-between mb-8 gap-4 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t('queueAppointments')}</h2>
          <div className="relative w-full md:w-64">
            <Search className={`absolute ${lang === 'ar' ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-slate-400`} size={16} />
            <input placeholder={t('searchPatient')} className={`w-full bg-gray-50 border border-gray-100 rounded-xl px-4 ${lang === 'ar' ? 'pr-4 pl-10 text-right' : 'pl-4 pr-10 text-left'} py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all`} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <thead>
              <tr className="border-b border-slate-100">
                {[t('patient'), t('type'), t('service'), t('lastVisit'), t('status')].map(h => (
                  <th key={h} className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {PATIENTS.map(p => (
                <tr key={p.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs">{p.name.charAt(0)}</div>
                      <span className="font-bold text-slate-700">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-slate-500 font-medium">{p.type}</td>
                  <td className="py-4 text-sm text-slate-500 font-bold">{p.service}</td>
                  <td className="py-4 text-sm text-slate-400 font-medium">{p.last_visit}</td>
                  <td className="py-4">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border ${
                      p.status === 'termine' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      p.status === 'en_cours' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {p.status === 'termine' ? t('completed') : p.status === 'en_cours' ? t('inProgress') : t('pending')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Health;
