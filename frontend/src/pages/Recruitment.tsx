import { useState, useEffect } from 'react';
import { UserPlus, Search, Filter, Plus, Calendar, Mail, FileText, CheckCircle2, Clock } from 'lucide-react';

const CANDIDATES = [
  { id: 1, name: 'Amine Alaoui', position: 'Ingénieur Info', date: '2025-05-10', status: 'entretien', email: 'a.alaoui@gmail.com' },
  { id: 2, name: 'Siham Berrada', position: 'Médecin', date: '2025-05-12', status: 'nouveau', email: 'siham.berr@outlook.com' },
  { id: 3, name: 'Omar Jabri', position: 'Technicien', date: '2025-05-08', status: 'rejete', email: 'o.jabri@yahoo.fr' },
];

const Recruitment = () => {
  return (
    <div className="animate-slide-up space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--primary-main)] dark:text-white font-heading">Gestion du Recrutement</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Suivi des concours, candidatures et intégration des nouveaux agents.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-5 py-2.5 shadow-lg shadow-emerald-900/10">
          <Plus size={18} /> Lancer un Concours
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Candidats (Mois)', value: '154', icon: <UserPlus size={20} className="text-blue-500" />, bg: 'bg-blue-50' },
          { label: 'Concours ouverts', value: '3', icon: <FileText size={20} className="text-amber-500" />, bg: 'bg-amber-50' },
          { label: 'Postes à pourvoir', value: '12', icon: <CheckCircle2 size={20} className="text-emerald-500" />, bg: 'bg-emerald-50' },
          { label: 'Temps moyen', value: '45j', icon: <Clock size={20} className="text-purple-500" />, bg: 'bg-purple-50' },
        ].map((kpi, i) => (
          <div key={i} className="gov-card p-6 flex flex-col group hover:scale-[1.02] transition-transform">
            <div className={`p-3 rounded-xl w-fit mb-4 ${kpi.bg}`}>{kpi.icon}</div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="gov-card overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Candidatures en attente</h2>
          <div className="flex gap-4">
            <div className="relative w-64">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input placeholder="Rechercher un candidat..." className="form-input w-full pl-4 pr-10 text-xs" />
            </div>
            <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"><Filter size={20} className="text-slate-400" /></button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                {['Candidat', 'Poste visé', 'Date dépôt', 'Statut', 'Actions'].map(h => (
                  <th key={h} className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {CANDIDATES.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center font-bold text-slate-400">{c.name.charAt(0)}</div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-700">{c.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-600 font-bold">{c.position}</td>
                  <td className="p-4 text-xs text-slate-400 font-bold">{c.date}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border ${
                      c.status === 'entretien' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      c.status === 'nouveau' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-red-50 text-red-700 border-red-100'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"><Mail size={16} /></button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-emerald-600 transition-colors"><CheckCircle2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Recruitment;
