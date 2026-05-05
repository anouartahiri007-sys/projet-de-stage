import { useState } from 'react';
import { useLang } from '../context/LangContext';
import { 
  Plus, 
  PawPrint, 
  FileCheck, 
  AlertTriangle, 
  Search, 
  MapPin, 
  Clock 
} from 'lucide-react';

const VETS = (t: any) => [
  { id: 1, name: 'Dr. Khalid Ziani', specialite: t('publicHealth') || 'Santé Publique', zone: 'Abattoirs', phone: '+212 661-123456', status: 'actif', interventions_mois: 12 },
  { id: 2, name: 'Dr. Fatima Zahra', specialite: t('sanitaryInspection') || 'Inspection Sanitaire', zone: 'Marchés', phone: '+212 662-789012', status: 'actif', interventions_mois: 8 },
  { id: 3, name: 'Dr. Rachid Mezouz', specialite: t('foodHygiene') || 'Hygiène alimentaire', zone: 'Marché Municipal', phone: '+212 663-334455', status: 'conge', interventions_mois: 0 },
];

const INTERVENTIONS = (t: any) => [
  { id: 1, type: t('sanitaryInspection') || 'Inspection sanitaire', lieu: 'Marché Municipal', date: '2025-04-22', vet: 'Dr. Khalid Ziani', result: 'conforme' },
  { id: 2, type: t('medicalEmergency') || 'Urgence médicale', lieu: 'Zone Rurale A', date: '2025-04-20', vet: 'Dr. Fatima Zahra', result: 'en_cours' },
  { id: 3, type: t('abattoirControl') || 'Contrôle abattoir', lieu: 'Abattoir Municipal', date: '2025-04-18', vet: 'Dr. Khalid Ziani', result: 'non_conforme' },
];

export default function Veterinary() {
  const { t, lang } = useLang();
  const [tab, setTab] = useState<'vets' | 'interventions'>('vets');

  const STATUS_MAP = {
    actif: { label: t('active'), cls: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    conge: { label: t('onLeave'), cls: 'bg-amber-50 text-amber-700 border-amber-100' },
    conforme: { label: t('conforming'), cls: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    non_conforme: { label: t('nonConforming'), cls: 'bg-red-50 text-red-700 border-red-100' },
    en_cours: { label: t('inProgress'), cls: 'bg-blue-50 text-blue-700 border-blue-100' },
  };

  return (
    <div className="animate-slide-up space-y-6 pb-12" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-3xl font-extrabold text-[#1E3E6E] dark:text-white font-heading">{t('vetService')}</h1>
          <p className="text-slate-500 mt-1 font-medium">{t('vetDesc')}</p>
        </div>
        <button className="bg-[#0d5e3f] hover:bg-[#0a4a31] text-white flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-900/10 active:scale-95 transition-all">
          <Plus size={18} /> {t('newIntervention')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: t('activeVets'), value: VETS(t).filter(v => v.status === 'actif').length, icon: <PawPrint size={20} className="text-teal-500" />, bg: 'bg-teal-50' },
          { label: t('interventionsMonth'), value: 24, icon: <FileCheck size={20} className="text-blue-500" />, bg: 'bg-blue-50' },
          { label: t('nonConformities'), value: INTERVENTIONS(t).filter(i => i.result === 'non_conforme').length, icon: <AlertTriangle size={20} className="text-red-500" />, bg: 'bg-red-50' },
        ].map((kpi, i) => (
          <div key={i} className={`gov-card p-6 flex items-center gap-4 group hover:scale-[1.02] transition-transform ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className={`p-4 rounded-2xl ${kpi.bg} group-hover:rotate-12 transition-transform`}>{kpi.icon}</div>
            <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="gov-card overflow-hidden">
        <div className={`flex border-b border-slate-100 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
          {[
            { key: 'vets', label: t('vetTeam') }, 
            { key: 'interventions', label: t('interventionsAndInspections') }
          ].map(t_tab => (
            <button 
              key={t_tab.key}
              onClick={() => setTab(t_tab.key as any)}
              className={`px-8 py-5 text-sm font-bold transition-all relative ${tab === t_tab.key ? 'text-[#1E3E6E] bg-slate-50/50' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {t_tab.label}
              {tab === t_tab.key && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1E3E6E] rounded-t-full" />}
            </button>
          ))}
        </div>

        <div className="p-6">
          {tab === 'vets' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VETS(t).map(vet => (
                <div key={vet.id} className={`border border-slate-100 rounded-2xl p-5 hover:border-teal-200 transition-colors bg-slate-50/30 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <div className={`flex justify-between mb-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full border ${STATUS_MAP[vet.status as keyof typeof STATUS_MAP].cls}`}>
                      ● {STATUS_MAP[vet.status as keyof typeof STATUS_MAP].label}
                    </span>
                    <button className="text-slate-300 hover:text-teal-600 transition-colors"><Search size={16} /></button>
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">{vet.name}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{vet.specialite}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium justify-start"><MapPin size={14} className="text-slate-300" /> {vet.zone}</div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium justify-start"><Clock size={14} className="text-slate-300" /> {vet.interventions_mois} {t('interventionsPerMonth')}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <thead>
                  <tr className="border-b border-slate-100">
                    {[t('interventionType'), t('location'), t('vet'), t('date'), t('result')].map(h => (
                      <th key={h} className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {INTERVENTIONS(t).map(i => (
                    <tr key={i.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 font-bold text-slate-700">{i.type}</td>
                      <td className="py-4 text-sm text-slate-500 font-medium">{i.lieu}</td>
                      <td className="py-4 text-sm text-slate-500 font-bold">{i.vet}</td>
                      <td className="py-4 text-sm text-slate-400 font-medium">{i.date}</td>
                      <td className="py-4">
                        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border ${STATUS_MAP[i.result as keyof typeof STATUS_MAP].cls}`}>
                          {STATUS_MAP[i.result as keyof typeof STATUS_MAP].label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
