import { useState, useEffect } from 'react';
import { HeartPulse, Activity, UserCheck, Calendar, Search, Filter, Plus, ShieldCheck, CheckCircle2 } from 'lucide-react';

const PATIENTS = [
  { id: 1, name: 'Sami Alami', type: 'Fonctionnaire', service: 'RH', last_visit: '2025-04-20', status: 'termine', motif: 'Consultation annuelle' },
  { id: 2, name: 'Mina El Fassi', type: 'Citoyen', service: 'Pédiatrie', last_visit: '2025-04-22', status: 'en_cours', motif: 'Vaccination' },
  { id: 3, name: 'Rachid Amrani', type: 'Fonctionnaire', service: 'Technique', last_visit: '2025-04-23', status: 'attente', motif: 'Urgence mineure' },
];

const Health = () => {
  const [tab, setTab] = useState('dashboard');

  return (
    <div className="animate-slide-up space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--primary-main)] dark:text-white font-heading">Service de Santé</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Gestion des consultations médicales et du suivi sanitaire des agents.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-5 py-2.5 shadow-lg shadow-emerald-900/10">
          <Plus size={18} /> Nouvelle Consultation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Consultations (Jour)', value: '18', icon: <Activity size={20} className="text-emerald-500" />, bg: 'bg-emerald-50' },
          { label: 'Agents suivis', value: '412', icon: <UserCheck size={20} className="text-blue-500" />, bg: 'bg-blue-50' },
          { label: 'Aptitudes validées', value: '94%', icon: <CheckCircle2 size={20} className="text-purple-500" />, bg: 'bg-purple-50' },
        ].map((kpi, i) => (
          <div key={i} className="gov-card p-6 flex items-center gap-4 group hover:scale-[1.02] transition-transform">
            <div className={`p-4 rounded-2xl ${kpi.bg} group-hover:rotate-12 transition-transform`}>{kpi.icon}</div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="gov-card p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">File d'attente & Rendez-vous</h2>
          <div className="relative w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input placeholder="Rechercher un patient..." className="form-input w-full pl-4 pr-10 text-xs" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                {['Patient', 'Type', 'Service', 'Dernière visite', 'Statut'].map(h => (
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
                      {p.status}
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
