import { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, MapPin, Search, Filter, Plus, CheckCircle, GraduationCap } from 'lucide-react';

const FORMATIONS = [
  { id: 1, title: 'Formation en soins intensifs', category: 'Médecine', duration: '3 jours', date: '2025-05-15', participants: 12, status: 'planifie', lieu: 'Centre Hospitalier Larache' },
  { id: 2, title: 'Hygiène et sécurité sanitaire', category: 'Santé publique', duration: '1 jour', date: '2025-04-28', participants: 8, status: 'en_cours', lieu: 'Salle de formation — Commune' },
  { id: 3, title: 'Législation vétérinaire marocaine', category: 'Vétérinaire', duration: '2 jours', date: '2025-03-10', participants: 5, status: 'termine', lieu: 'ONSSA Larache' },
  { id: 4, title: 'Gestion administrative & RH', category: 'Administration', duration: '4 jours', date: '2025-06-02', participants: 15, status: 'planifie', lieu: 'Commune de Larache — Bâtiment A' },
];

const STATUS_MAP = {
  planifie: { label: 'Planifiée', cls: 'bg-blue-50 text-blue-700 border-blue-100' },
  en_cours: { label: 'En cours', cls: 'bg-amber-50 text-amber-700 border-amber-100' },
  termine: { label: 'Terminée', cls: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
};

export default function Training() {
  const [filter, setFilter] = useState('tous');

  return (
    <div className="animate-slide-up space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--primary-main)] dark:text-white font-heading">Formation & Développement</h1>
          <p className="text-slate-500 mt-1 font-medium">Suivi du renforcement des capacités et de la formation continue des agents.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-5 py-2.5 shadow-lg shadow-blue-900/10">
          <Plus size={18} /> Nouvelle Formation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Formations planifiées', value: FORMATIONS.filter(f => f.status === 'planifie').length, icon: <Calendar size={20} className="text-blue-500" />, bg: 'bg-blue-50' },
          { label: 'En cours', value: FORMATIONS.filter(f => f.status === 'en_cours').length, icon: <Clock size={20} className="text-amber-500" />, bg: 'bg-amber-50' },
          { label: 'Terminées', value: FORMATIONS.filter(f => f.status === 'termine').length, icon: <CheckCircle size={20} className="text-emerald-500" />, bg: 'bg-emerald-50' },
          { label: 'Taux de réussite', value: '98%', icon: <GraduationCap size={20} className="text-purple-500" />, bg: 'bg-purple-50' },
        ].map((kpi, i) => (
          <div key={i} className="gov-card p-6 flex flex-col group hover:scale-[1.02] transition-transform">
            <div className={`p-3 rounded-xl w-fit mb-4 ${kpi.bg}`}>{kpi.icon}</div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="gov-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Catalogue des Formations</h2>
              <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
                {['tous', 'planifie', 'en_cours', 'termine'].map(s => (
                  <button 
                    key={s} 
                    onClick={() => setFilter(s)}
                    className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${filter === s ? 'bg-white text-[var(--primary-main)] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {FORMATIONS.filter(f => filter === 'tous' || f.status === filter).map(formation => (
                <div key={formation.id} className="group border border-slate-100 rounded-2xl p-5 hover:border-blue-200 transition-all hover:bg-blue-50/10 cursor-pointer">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
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
                      <p className="text-[10px] font-bold text-slate-400 mt-2">{formation.participants} agents inscrits</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="gov-card p-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Demandes de Formation</h2>
            <div className="space-y-5">
              {[
                { name: 'Sami Alami', formation: 'Anglais technique', date: 'il y a 2h' },
                { name: 'Dr. Ziani', formation: 'Nouvelles normes ONSSA', date: 'il y a 5h' },
                { name: 'Houda Mansouri', formation: 'Excel Avancé', date: 'Hier' }
              ].map((req, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white overflow-hidden shrink-0">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{req.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Technicien de santé</p>
                    <p className="text-xs text-slate-600 mt-1 font-medium bg-slate-50 px-2 py-1 rounded border border-slate-100 w-fit">{req.formation}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] text-slate-400 font-medium">{req.date}</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 uppercase">Confirmé</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 btn-secondary text-sm font-bold border-2 border-slate-100">Gérer les demandes</button>
          </div>

          <div className="gov-card p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white overflow-hidden relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <h2 className="text-lg font-bold mb-2 relative z-10">Guide de Formation</h2>
            <p className="text-xs text-blue-100 mb-6 relative z-10 leading-relaxed">Consultez le plan de formation annuel 2025 pour mieux orienter vos équipes.</p>
            <button className="w-full py-2.5 bg-white text-blue-700 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:scale-[1.02] transition-transform relative z-10">Télécharger le PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}
